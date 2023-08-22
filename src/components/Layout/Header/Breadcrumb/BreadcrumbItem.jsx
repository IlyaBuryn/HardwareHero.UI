import React from 'react';
import './Breadcrumb.css'


const BreadcrumbItem = ({ label, url }) => {

  if (url) {
    return (
      <>
        <a className='link' href={url}>{label}</a>
        <span className='link'> &gt; </span>
      </>
    );
  }
  return (
    <span className='link'>{label}</span>
  );
};


export default BreadcrumbItem;
