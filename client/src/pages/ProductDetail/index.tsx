import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { STORES } from '~constants';
import ProductsStore from '~stores/product/ProductStore';
import BackTopBar from '~components/BackTopBar';
import Footer from '~components/Footer';
import { inject, observer } from 'mobx-react';
import { getCategoryName } from '~pages/utils';
import moment from 'moment';
import 'moment/locale/ko';

type ProductDetailProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
} & RouteComponentProps<{ id: string }>;

function ProductDetail(props: ProductDetailProps) {
  useEffect(() => {
    props[STORES.PRODUCTS_STORE].getProduct(props.match.params.id);
  }, []);

  const { detailProduct } = props[STORES.PRODUCTS_STORE];
  const { image, category, title, price, createdAt, description, carModelYear, carMileage, smoking } = detailProduct;
  const time = moment(createdAt);
  const showCarInfo = category===0 ? true : false
  
  console.log('detailProduct', detailProduct);

  return (
    <>
      <BackTopBar />
      <div className="container container-sm container-detail">
        <img
          src={image}
          alt=""
          width="100%"
        />
        <h3 className="product-title">{title}</h3>
        <h4 className="product-price" style={{ fontWeight: 'bold' }}>
          {price}원
        </h4>
        <ul className="list-product-information">
          <li className="list-item category">
            카테고리 <span>{getCategoryName(category)}</span>
          </li>
          <li className="list-item date">
            상품 등록 시간{' '}
            <span>
              <time dateTime="2019-08-20T08:30:00Z">{time.fromNow()}</time>
            </span>
          </li>
          {showCarInfo && <li className="list-item car-model-year">
            차량 연식 <span>{String(moment().diff(carModelYear, "years"))}년</span>
          </li>}
          {showCarInfo && <li className="list-item car-mileage">
            주행 거리 <span>{String(carMileage)}km</span>
          </li>}
          {showCarInfo && <li className="list-item car-smoking">
            판매자 흡연 여부 <span>{smoking ? "흡연자" : "비 흡연자"}</span>
          </li>}
        </ul>
        <div className="description">{description}</div>
      </div>
      <Footer />
    </>
  );
}

export default inject(STORES.PRODUCTS_STORE)(observer(ProductDetail));
