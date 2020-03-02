import React, { Fragment, useState } from 'react';
import './view.scss';
import { Input, Upload, message, Modal } from 'antd';
import '../../style/iconfont.scss';
import { LoadingOutline, PlusOutline } from '@ant-design/icons';

const Edit: React.FC = () => {
  const [personal, setPersonal] = useState(true);
  const [password, setPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  //点击个人资料
  function editPersonal() {
    setPersonal(true);
    setPassword(false);
  }
  //点击修改密码
  function editPassword() {
    setPersonal(false);
    setPassword(true);
  }
  //上传头像
  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
        setLoading(false)
      }
      );
    }
  };

  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutline /> : <PlusOutline />} */}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <Fragment>
      <div className="edit_container">
        <div className="top_muen">
          <div className={`item1 ${personal ? "active" : ""}`} onClick={editPersonal}>个人资料</div>
          <div className={`item2 ${password ? "active" : ""}`} onClick={editPassword} >修改密码</div>
        </div>
        <div className="line"></div>
        {
          personal && (
            <Fragment>
              <div className="personal">
                <div className="personal_title">个人资料</div>
                <div className="avater">
                  <div className="avater_one">头像</div>
                  <div className="avater_img">
                    {/* <img className="img1" src="https://img01.sogoucdn.com/app/a/07/57d9e1c69332c8da692c3ec5c0e1466b" alt="" /> */}
                    {imageUrl ?<img src={imageUrl} alt="avatar" className="img1" /> : <img className="img1" src="https://img01.sogoucdn.com/app/a/07/57d9e1c69332c8da692c3ec5c0e1466b" alt="avatar" />}
                    <div className="avater_upload">
                      <div className="avater_info">支持jpg、png各式大小5M以内的图片</div>
                      {/* <div className="avater_btu">文件上传</div> */}
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://39.107.28.7:8080/file/upload"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                        {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                        <div className="avater_btu">文件上传</div>
                      </Upload>
                    </div>
                  </div>
                </div>
                <div className="name">
                  <div className="username">昵称</div>
                  <Input className="input_name" value="你可以叫我崽崽" />
                  <i className="iconfont icno">&#xe615;</i>
                </div>
                <div className="email">
                  <div className="email_txt">邮箱</div>
                  <Input className="input_name" value="1392091646@qq.com" />
                  <i className="iconfont icno">&#xe615;</i>
                </div>
              </div>
            </Fragment>

          )
        }
        {
          password && (
            <Fragment>
              <div className="editPassword">
                <div className="password_title">修改密码</div>
                <div className="old_password">
                  <div className="old_title">旧密码</div>
                  <Input className="input_old" placeholder="请输入你的旧密码" />
                </div>
                <div className="new_password">
                  <div className="new_title">新密码</div>
                  <Input className="input_new" placeholder="请输入你的新密码" />
                </div>
                <div className="again_password">
                  <div className="again_title">确认密码</div>
                  <Input className="input_again" placeholder="请再次输入密码" />
                </div>
              </div>
            </Fragment>
          )
        }

        <div className="sumit">提交</div>
      </div>
    </Fragment>
  )
}

export default Edit;
