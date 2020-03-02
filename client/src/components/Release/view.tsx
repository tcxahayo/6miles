import React, { Fragment, useEffect, useState } from 'react';
import './view.scss';
import { Cascader, Input, Upload, Icon, Modal, message, Steps } from 'antd';
import { getCategory, ICategort } from '../../pages/Home/apis';
import { releaseGoods } from './api'

const { Step } = Steps;
const { TextArea } = Input;
interface Form {
  area: string,
  categoryId: string,
  desc: string,
  id: string,
  images: string,
  latitude: number,
  longitude: number,
  price: number,
  title: string
}

const Release: React.FC = () => {
  const [category, setCategory] = useState<ICategort[]>([]);
  const [form, setForm] = useState<Form>();

  const options2 = category.map((item, index) => {
    return {
      code: item.id,
      name: item.title,
      items: item.children.map((item, index) => {
        return {
          code: item.id,
          name: item.title
        }
      })
    }
  })

  function getValue(value: any) {
    const categoryIds = value.join("_");
    setForm(Object.assign({}, form, { categoryId: categoryIds }))
    console.log(categoryIds)
  }
  //获取商品分类
  useEffect(function () {
    getCategory().then((res) => {
      setCategory(res);
    })
  }, [])
  //获取定位
  useEffect(() => {
    const myCity = new BMap.LocalCity();
    const gc = new BMap.Geocoder();
    myCity.get((result: any) => {
      console.log(result)
      const lat = result.center.lat
      const lng = result.center.lng
      const city = result.name;
      const pt = result.center;
      gc.getLocation(pt, function (rs: any) {
        const addComp = rs.addressComponents;
        const province = addComp.province;
        setForm(Object.assign({}, form, { latitude: lat, longitude: lng, area: city + province }));
      })
    })
  }, [])
  //获取用户输入信息
  function changeValue(e: any) {
    const value = e.target.value;
    switch (e.target.name) {
      case "name":
        setForm(Object.assign({}, form, { title: value }));
        break
      case "price":
        setForm(Object.assign({}, form, { price: value }));
        break
      case "desc":
        setForm(Object.assign({}, form, { desc: value }));
    }
  }
  //文件上传
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  function handleCancel() {
    setPreviewVisible(false)
  }

  async function handlePreview(file: any) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }
  function handleChange({ fileList }: any) {
    const data = fileList.map((item: any, index: number) => {
      if (item.status === 'done') {
        return item.response.data
      }
    }).join(',');
    setForm(Object.assign({}, form, { images: data, latitude: 104.1234, longitude: 30.3421, area: '四川成都' }));
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  //文件上传
  async function pulishGoods() {
    const data = await releaseGoods({ ...form });
    if (data) {
      message.success('发布成功', 2);
      setTimeout(window.location.href = 'http://localhost:3000/release', 2000)

    }
  }

  return (
    <Fragment>
      <div className="c_relese_container">
        <div className="classify">
          <div className="choise"></div>
          <div className="classTxt">商品分类：</div>
          <div className="class_content">
            <Cascader
              fieldNames={{ label: 'name', value: 'code', children: 'items' }}
              options={options2}
              placeholder="选择分类"
              className="cascader"
              onChange={getValue}
            >
            </Cascader>
          </div>

        </div>
        <div className="goods_name">
          <div className="choise"></div>
          <div className="name">商品名称:</div>
          <div className="nameInput">
            <TextArea rows={4} placeholder="商品名称" className="input" onChange={changeValue} name="name" value={form?.title} />
          </div>

        </div>
        <div className="goods_price">
          <div className="choise"></div>
          <div className="price">价格：</div>
          <div className="price_input">
            <Input placeholder="报价" className="input" onChange={changeValue} name="price" value={form?.price} />
          </div>
        </div>
        <div className="goods_desc">
          <div className="choise"></div>
          <div className="desc">商品描述：</div>
          <div className="desc_input">
            <TextArea rows={4} placeholder="商品描述" className="input" onChange={changeValue} name="desc" value={form?.desc} />
          </div>
        </div>
        <div className="goods_picture">
          <div className="choise"></div>
          <div className="name">商品图片:</div>
          <div className="picture_box">
            <div className="clearfix">
              <Upload
                action="http://39.107.28.7:8080/file/upload"
                // customRequest={customRequest}
                listType="picture-card"
                // fileList={fileList2}
                onPreview={handlePreview}
                onChange={handleChange}

              >
                {/* {fileList.length >= 8 ? null : uploadButton} */}
                {uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="canle">取消</div>
          <div className="submit" onClick={pulishGoods}>发布</div>
        </div>

      </div>
    </Fragment>
  )
}

export default Release;
