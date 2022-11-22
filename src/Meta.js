import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import reactjs from './assets/img/reactjs.png';

const Meta = (props) => {
  return (
    <HelmetProvider>
            <Helmet>
                <meta charset='utf-8' />
                <title>{props.title}</title>
                {/* SEO 태그 */}
                <meta name='description' content={props.description}/>
                <meta property='og:type' content={'website'}/>              
                <meta property='og:title' content={'props.title'}/>                
                <meta property='og:description' content={'props.description'}/>                
                <meta property='og:image' content={'props.image'}/>                
                <meta property='og:url' content={'props.url'}/>                

                <link rel="shortcut icon" href={props.image} type="image/png" />
                <link rel="icon" href={props.image} type="image/png" />
            </Helmet>
        </HelmetProvider>
  );
};

Meta.defaultProps = {
    title: 'react test',
    description: '리액트 프로그래밍 시험입니다.',
    keywords: 'React',
    author: '지인',
    image: reactjs,
    url: window.location.href
};

export default Meta;