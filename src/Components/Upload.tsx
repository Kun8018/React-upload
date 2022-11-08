import React, { useRef } from 'react';
import { Pic } from '../App';
import { JudgePic } from '../utils/request'
import './Upload.css';

type ImgUploadProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** 图片预览功能 */
  preview?: boolean;
  onchange?: (src: Pic,type: 'add' | 'edit') => void;
}

 const ImgUpload: React.FC<ImgUploadProps> = ({
  src,
  onError,
  preview = false,
  className,
  onchange,
  ...props
}) => {
    const getFilds = () =>{
        const filedom = document.getElementById('upload');
        filedom?.click()
    }

    function readFile(e: any){
        let file = [];
        const filesItem =  e.target.files;
        console.log('filesItem', Array.isArray(filesItem))
        if (filesItem.length >= 9) {
            alert("一次最多上传" + 9 + "张图片");
            return;
        }else {
            // 继发上传
            // for(var i = 0;i< filesItem.length;i++){
                            
            //     file = filesItem[i];

            //     var reader = new FileReader();
            //     reader.readAsDataURL(file);
            //     reader.onload = function(val) {
            //         const src = val?.target?.result;
            //         onchange?.(src as string)
            //     };
            // }
            // 并发上传
            for(var i = 0;i< filesItem.length;i++){
                onchange?.({loading: true, src: '', name: ''}, 'add') 
                file.push(filesItem[i])
            }
            const promiseArr = file.map((file: any) => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                return JudgePic(file)
            });
            console.log('promiseArr', promiseArr)
            try {
                Promise.all(promiseArr).then(res => {console.log('res',res)})
                Promise.all(promiseArr).then(res => {
                    res.map((item) => {
                        onchange?.({src: item as string, loading: false, name: 'a'}, 'edit') 
                    })
                })
            } catch (error) {
                console.log(error)
            }
                
            
        };
    };

  return (
      <div
        style={{ width: props?.width, height: props?.height}}
        className='uploadButton'
      >
        <div onClick={getFilds} style={{ cursor: 'pointer'}}>
            图片上传
        </div>
        <input type="file" multiple={true} accept='image/*' id="upload" onChange={readFile} style={{display: 'none'}}/>
      </div>
  );
};

export default ImgUpload
