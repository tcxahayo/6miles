import React from 'react';
import useQuery from '@/Hooks/useQuery';
import './view.scss';

const Goods: React.FC = () => {
  const query = useQuery();
  const key = query.get('key');

  return (
    <div className="goods_container">
      物品搜索:{key}
    </div>
  )
}

export default Goods;
