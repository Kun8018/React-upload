import React, {useState} from 'react';
import logo from './logo.svg';
import ImgPreview from './Components/Preview'
import ImgUpload from './Components/Upload'
import DownloadButton from './Components/DownloadButton'
import './App.css';

export type Pic = {
  src: string,
  loading: boolean,
  name: string
}

function App() {
  const [src, setSrc] = useState<Pic[]>([])
  const [currentPreview, setCurrentPreview] = useState<string>('')

  const onUploadChange= (newImageSrc: Pic, type: 'add' | 'edit') => {
    if(type === 'add') {
      setSrc((prevSrc) => {
        return (prevSrc || []).concat([newImageSrc])
      })
    }
    setSrc((prevSrc) => {
      let flag = 0;
      const result = (prevSrc || []).map((item) => {
        if(flag === 1) {
          return item
        }
        if(item.loading === true ) {
          flag = 1
          return newImageSrc
        };
        return item
      })
      return result
    })
  }

  const onDelete = (index: number) => {
    setSrc((prevSrc) => {
      if(prevSrc?.[index].src === currentPreview) {
        setCurrentPreview('')
      }
      return (prevSrc || []).splice(index,1)
    })
  }
  const download = () => {
    // download不需请求后端，直接创建a标签实现
    // 请求后端的话传content-Type为array-buffer，拿到二进制后blob方式读取
    if(src.length === 0) return
    const link = document.createElement('a');
    (src || []).forEach(item => {
      link.href = src?.[0]?.src;
      link.download = src?.[0]?.src;
      link.click();
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <ImgPreview 
          src={currentPreview}
          width={400}
          height={450}
        />
        <div style={{display: 'flex', overflow: 'scroll', width: '100%'}}>
        <ImgUpload           
          width={200}
          height={250}
          onchange={onUploadChange}
        />
        {(src || []).map((item, index) => {
          return  (
            <div key={index} onClick={() => setCurrentPreview(item.src)} style={{margin: '0 10px'}}>
              <ImgPreview 
                src={item.src}
                isLoaded={!item.loading}
                width={200}
                height={250}
              />
              <span 
                style={{position: 'absolute',}} 
                onClick={(e) => {
                  e.stopPropagation(); 
                  return onDelete(index);
                }}>
                &times;
              </span>
            </div>
          )
        })}
        <DownloadButton download={download} disabled={src.length === 0}/>
        </div>

      </header>
    </div>
  );
}

export default App;
