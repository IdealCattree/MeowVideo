import React from "react";
import { Button, Popconfirm, Switch, Table, message, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IMovieState } from "../redux/reducers/MovieReducer";
import { IMovie } from "../services/MovieService";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { SwitchTypes } from "../services/CommonTypes";
import defaultPoster from "../assets/none.jpg";
import { NavLink } from "react-router-dom";

export interface IMovieEvents {
  onLoad: () => void;
  onSwitchChange: (type: SwitchTypes, value: boolean, id: string) => void;
  deleteChange: (id: string) => Promise<void>;
  onPageChange: (newPage: number) => void;
  onChangeKey: (key: string) => void;
  onSearch: () => void;
}

export default class MovieTable extends React.Component<IMovieState & IMovieEvents> {
  componentDidMount() {
    this.props.onLoad();
  }
  private getMovieProp(): ColumnsType<IMovie> {
    return [
      {
        title: "封面",
        dataIndex: "poster",
        render: poster => {
          if (poster) {
            return <img className="poster" src={poster} alt="" />;
          } else {
            return <img className="poster" src={defaultPoster} alt="" />;
          }
        },
      },
      {
        title: "名称",
        dataIndex: "name",
        filterDropdown: props => {
          return (
            <div style={{ padding: 8 }}>
              <Input
                value={this.props.condition.key}
                onChange={e => {
                  this.props.onChangeKey(e.target.value);
                }}
                onPressEnter={() => {
                  this.props.onSearch();
                }}
                style={{ width: 188, marginBottom: 8, display: "block" }}
              />
              <Space>
                <Button
                  type="primary"
                  size="small"
                  style={{ width: 90 }}
                  onClick={() => {
                    this.props.onSearch();
                  }}
                >
                  Search
                </Button>
                <Button
                  size="small"
                  style={{ width: 90 }}
                  onClick={() => {
                    this.props.onChangeKey("");
                    this.props.onSearch();
                  }}
                >
                  Reset
                </Button>
              </Space>
            </div>
          );
        },
        filterIcon: <SearchOutlined />,
      },
      {
        title: "地区",
        dataIndex: "areas",
        render: (text: string[]) => {
          return text.join("，");
        },
      },
      {
        title: "类型",
        dataIndex: "types",
        render: (text: string[]) => {
          return text.join("，");
        },
      },
      {
        title: "时长",
        dataIndex: "time",
        render: (text: number) => {
          return text + "分钟";
        },
      },
      {
        title: "正在热映",
        dataIndex: "isHot",
        render: (text, record) => {
          return (
            <Switch
              checked={text}
              onChange={newValue => {
                this.props.onSwitchChange(SwitchTypes.isHot, newValue, record._id!);
              }}
            />
          );
        },
      },
      {
        title: "即将上映",
        dataIndex: "isComing",
        render: (text, record) => {
          return (
            <Switch
              checked={text}
              onChange={newValue => {
                this.props.onSwitchChange(SwitchTypes.isComing, newValue, record._id!);
              }}
            />
          );
        },
      },
      {
        title: "经典影片",
        dataIndex: "isClassic",
        render: (text, record) => {
          return (
            <Switch
              checked={text}
              onChange={newValue => {
                this.props.onSwitchChange(SwitchTypes.isClassic, newValue, record._id!);
              }}
            />
          );
        },
      },
      {
        title: "操作",
        dataIndex: "_id",
        render: id => {
          return (
            <div>
              <NavLink to={"/movie/edit/" + id}>
                <Button type="primary" size="small">
                  编辑
                </Button>
              </NavLink>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={async () => {
                  await this.props.deleteChange(id);
                  message.success("删除成功");
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary" danger size="small">
                  删除
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
  }

  private getPagination(): TablePaginationConfig {
    return {
      total: this.props.total,
      pageSize: this.props.condition.limit,
      current: this.props.condition.page,
      showSizeChanger: false,
    };
  }

  render() {
    return (
      <div>
        <Table
          scroll={{ x: true, y: "70vh" }}
          size="small"
          pagination={this.getPagination()}
          onChange={newPage => {
            this.props.onPageChange(newPage.current!);
          }}
          dataSource={this.props.data}
          rowKey="_id"
          columns={this.getMovieProp()}
          loading={this.props.isLoading}
        />
      </div>
    );
  }
}
