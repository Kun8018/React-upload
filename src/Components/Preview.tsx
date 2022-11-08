import React, { useEffect,useState } from 'react';
import './Preview.css';

type ImgPreviewProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  placeholderIcon?: React.ReactNode;
  placeholderText?: string;
  /** 图片预览功能 */
  preview?: boolean;
  isLoaded?: boolean;
}

 const ImgPreview: React.FC<ImgPreviewProps> = ({
  placeholderIcon,
  placeholderText,
  src,
  onError,
  isLoaded = true,
  preview = false,
  className,
  ...props
}) => {
  const [error, setError] = useState(false);
  const handleError = (event: any) => {
    setError(true);
    onError?.(event);
  };

  const Alert = () => {
    alert("你好，我是一个警告框！");
  }

  useEffect(() => {
    setError(false);
  }, [src]);

  if(!isLoaded) {
    return (
      <div
        style={{ width: props?.width, height: props?.height || 90 }}
        className='justify-center flex-col loadingImage'
      >
        <div>
            图片加载中
        </div>
      </div>
    ); 
  }

  if (error) {
    return (
      <div
        style={{ width: props?.width, height: props?.height || 90 }}
        className='justify-center flex-col'
      >
        <div onClick={Alert}>
            图片显示错误
        </div>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src ?? ''}
      onError={handleError}
      className='image'
    />
  );
};

export default ImgPreview
