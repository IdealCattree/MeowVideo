import React, { useEffect } from "react";
import { Button, Checkbox, ColProps, Form, Input, InputNumber, message, Switch } from "antd";
import ImageUpload from "./ImageUpload";
import { IMovie } from "../services/MovieService";
import { withRouter, RouteComponentProps } from "react-router";

// 约束表单布局属性的接口
interface IColProps {
  labelCol: ColProps;
  wrapperCol: ColProps;
}

// 表单布局的属性
const formItemLayout: IColProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19, offset: 1 },
};

// 地区多选框的类别
const AreaAll = [
  { label: "中国大陆", value: "中国大陆" },
  { label: "美国", value: "美国" },
  { label: "中国香港", value: "中国香港" },
  { label: "中国台湾", value: "中国台湾" },
];

// 电影类型多选框的类别
const TypesAll = [
  { label: "喜剧", value: "喜剧" },
  { label: "灾难", value: "灾难" },
  { label: "恐怖", value: "恐怖" },
  { label: "爱情", value: "爱情" },
  { label: "动作", value: "动作" },
];

// 约束 MovieForm函数 属性的接口
interface IProps extends RouteComponentProps {
  onSubmit: (movie: IMovie) => Promise<string>;
  movie?: IMovie;
}

function MovieForm(props: IProps) {
  // 获取用于表单交互的对象
  const [form] = Form.useForm();

  // 编辑电影时做数据回填
  const { setFieldsValue } = form;
  useEffect(() => {
    if (props.movie) {
      setFieldsValue(props.movie);
    }
  }, [props.movie, setFieldsValue]);

  // if (props.movie) {
  //   setFieldsValue(props.movie);
  // }

  // 提交表单成功的回调函数
  const handleSuccess = async (movie: IMovie) => {
    // submit 返回的是一个字符串  如果成功返回“添加成功” 如果失败返回错误消息
    const res = await props.onSubmit(movie);
    if (res) {
      message.error(res);
    } else {
      message.success("处理成功", 1, () => {
        props.history.push("/movie");
      });
    }
  };

  return (
    <Form
      {...formItemLayout}
      style={{ width: "400px" }}
      form={form}
      // 验证成功执行的函数
      onFinish={value => {
        handleSuccess(value);
      }}
      // 验证失败执行的函数
      onFinishFailed={value => {
        message.error("提交失败");
      }}
    >
      <Form.Item name="poster" label="电影封面" hasFeedback>
        <ImageUpload />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "电影名不能为空" }]}
        name="name"
        label="电影名称"
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "地区不能为空" }]}
        name="areas"
        label="地区"
        hasFeedback
      >
        <Checkbox.Group options={AreaAll} />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "类型不能为空" }]}
        name="types"
        label="类型"
        hasFeedback
      >
        <Checkbox.Group options={TypesAll} />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "时长不能为空" }]}
        name="time"
        label="时长"
        hasFeedback
      >
        <InputNumber min={1} keyboard={true} />
      </Form.Item>

      <Form.Item
        name="isHot"
        label="正在热映"
        hasFeedback
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="isComing"
        label="即将上映"
        hasFeedback
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="isClassic"
        label="经典影片"
        hasFeedback
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </Form.Item>

      <Form.Item name="description" label="简介">
        <Input.TextArea />
      </Form.Item>

      <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 20, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withRouter(MovieForm);
