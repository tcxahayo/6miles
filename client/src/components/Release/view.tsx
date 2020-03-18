import React, { Fragment, useEffect, useState } from 'react';
import { Cascader, Input, Upload, Modal, message } from 'antd';
import PlusOutlined from '@ant-design/icons';
import { getCategory, ICategort } from '../../pages/Home/apis';
import { releaseGoods, editGoods } from './api'
import './view.scss';
import { useLocation, useHistory } from "react-router-dom";
import { conectGoods, Details } from '@/pages/GoodsDetail/api';

const { TextArea } = Input;
interface Form {
  area?: string,
  categoryId?: string,
  desc?: string,
  id?: string,
  images?: any,
  latitude?: number,
  longitude?: number,
  price?: number,
  title?: string
}


const Release: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [category, setCategory] = useState<ICategort[]>();
  const [form, setForm] = useState<Form>({});
  const [goods, setGoods] = useState<Details>();
  const [categoryValue, setCategoryValue] = useState<string[]>();
  const [demo, setDemo] = useState<any>([]);
  const [isShow, setIsShow] = useState(false);
  const [isMy, setIsMy] = useState(false);
  const [id, setId] = useState();


  // 获取商品详情
  useEffect(() => {
    if (location.state && location.state.id) {
      (async function () {
        const data = await conectGoods(location.state.id);
        setGoods(data.details);
        setIsMy(true);
        setId(location.state.id)
      })()
    }
  }, [location])

  //获取商品分类
  useEffect(function () {
    getCategory().then((res) => {
      setCategory(res);
    })
  }, [])

  // 获取商品详情中的分类
  useEffect(() => {
    if (category && goods) {
      category.forEach((item) => {
        item.children.forEach((citem) => {
          if (citem.id === goods.categoryId) {
            setCategoryValue([citem.parentId, citem.id])
          }
        })
      })
      setForm(form => Object.assign({}, form, { title: goods.title, price: goods.price, desc: goods.desc }))
      const newArr = goods.images.split(',');
      newArr.forEach((item, index) => {
        setDemo((demo: any[]) => {
          return demo.concat({ uid: index, url: item, status: 'done' })
        })
        setIsShow(true)
      })
    }
  }, [category, goods])


  useEffect(() => {
    if (categoryValue) {
      setForm(form => Object.assign({}, form, { categoryId: categoryValue[1] }))
      setIsShow(true)
    }
  }, [categoryValue])
  //获取定位
  //定位
  useEffect(() => {
    AMap.plugin('AMap.CitySearch', function () {
      var citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status: any, result: any) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          const lat = result.bounds.xc.lat;
          const lng = result.bounds.xc.lng;
          const province = result.province;
          const city = result.city
          setForm(form => Object.assign({}, form, { latitude: lat, longitude: lng, area: province + ' , ' + city }));
        }
      })
    })
  }, [])
  //获取用户输入信息
  function changeValue(e: any) {
    const value = e.target.value;
    switch (e.target.name) {
      case "name":
        setForm(form => Object.assign({}, form, { title: value }))
        break
      case "price":
        setForm(form => Object.assign({}, form, { price: value }))
        break
      case "desc":
        setForm(form => Object.assign({}, form, { desc: value }))
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
  function hanleRemove(file: any) {
    console.log(file)
  }
  function handleChange({ fileList }: any) {
    setDemo(fileList);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  //文件上传
  async function pulishGoods() {
    const demo0 = demo.map((item: any, index: any) => {
      if (item.response) {
        return item.response.data
      } else {
        return item.url
      }
    })
    const data = await releaseGoods(Object.assign(form, {
      images: demo0.join(',')
    }));
    if (data) {
      message.success('发布成功', 2);
      setTimeout(() => {
        jump()
      }, 2000);
    }
  }
  function jump() {
    history.push('/profile')
  }
  //修改
  async function edit() {
    const demo0 = demo.map((item: any, index: any) => {
      if (item.response) {
        return item.response.data
      } else {
        return item.url
      }
    })
    const data = await editGoods(id, Object.assign(form, {
      images: demo0.join(',')
    }))
    if (data) {
      message.success('修改成功', 2);
      setTimeout(() => {
        jump()
      }, 2000);
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
            fieldNames={{ label: 'title', value: 'id', children: 'children' }}
            options={category}
            placeholder="选择分类"
            className="cascader"
            onChange={(value) => setCategoryValue(value)}
            value={categoryValue}
          >
          </Cascader>
        </div>

      </div>
      <div className="goods_name">
        <div className="choise"></div>
        <div className="name">商品名称:</div>
        <div className="nameInput">
          <TextArea rows={4} placeholder="商品名称" className="input" onChange={changeValue} name="name" value={form.title} />
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
            {
              (isShow && (
                <Fragment>
                  <Upload
                    action="http://39.107.28.7:8080/file/upload"
                    // customRequest={customRequest}
                    listType="picture-card"
                    onPreview={handlePreview}
                    onChange={handleChange}
                    defaultFileList={demo}
                    onRemove={hanleRemove}

                  >
                    {/* {fileList.length >= 8 ? null : uploadButton} */}
                    {uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </Fragment>
              ))
            }

          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="canle">取消</div>
        {
          (isMy && (
            <Fragment>
              <div className="submit" onClick={edit}>修改</div>

            </Fragment>
          )) || (
            <Fragment>
              <div className="submit" onClick={pulishGoods}>发布</div>
            </Fragment>
          )
        }
      </div>

    </div>
  </Fragment>
)}

export default Release;
