import React from 'react';
import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumb = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <BreadcrumbItem key={index} label={item.label} url={item.url} />
      ))}
    </div>
  );
};

export default Breadcrumb;
