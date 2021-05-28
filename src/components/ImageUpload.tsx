import React, { ReactNode } from "react";
import { message, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { IResponseData, IResponseError } from "../services/CommonTypes";

interface IState {
  isShowModel: boolean;
}

interface IProps {
  value?: string;
  onChange?: (imgurl: string) => void;
}
export default class ImageUpload extends React.Component<IProps, IState> {
  state: IState = {
    isShowModel: false,
  };

  /**
   * 获取上传图片区域的元素
   * @returns
   */
  private getUploadContent(): ReactNode {
    if (this.props.value) {
      return null;
    } else {
      return (
        <div>
          <PlusOutlined />
          <h1>点击上传</h1>
        </div>
      );
    }
  }

  /**
   * 获取图片列表
   * @returns
   */
  private getFileList(): UploadFile<any>[] {
    if (this.props.value) {
      return [
        {
          name: this.props.value,
          uid: this.props.value,
          url: this.props.value,
        },
      ];
    } else {
      return [];
    }
  }

  /**
   * 上传图片触发的函数
   * @param p
   */
  private async handleChange(p: any) {
    // 创建一个formdata用于存储图片
    let formData = new FormData();
    formData.append("imgfile", p.file);

    // 发送图片的request对象
    const request = new Request(p.action, {
      method: "post",
      body: formData,
    });

    const res: IResponseData<string> | IResponseError = await fetch(request).then(resp =>
      resp.json()
    );

    if (res.status === 200) {
      if (this.props.onChange) {
        this.props.onChange(res.data!);
      }
    } else {
      message.error("上传失败");
    }
  }

  render() {
    return (
      <div>
        <Upload
          name="imgfile"
          listType="picture-card"
          action="/api/upload"
          fileList={this.getFileList()}
          accept="image/png,image/jpeg,image/jif,image/jiff,image/webg"
          customRequest={(p: any) => {
            this.handleChange(p);
          }}
          onPreview={() => {
            this.setState({
              isShowModel: true,
            });
          }}
          onRemove={() => {
            if (this.props.onChange) {
              this.props.onChange("");
            }
          }}
        >
          {this.getUploadContent()}
        </Upload>

        <Modal
          visible={this.state.isShowModel}
          onCancel={() => {
            this.setState({ isShowModel: false });
          }}
          footer={null}
        >
          <img alt="" style={{ width: "100%" }} src={this.props.value} />
        </Modal>
      </div>
    );
  }
}
