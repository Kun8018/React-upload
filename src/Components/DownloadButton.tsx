import React, { useEffect,useState } from 'react';
import './DownloadButton.css';

type DownloadButtonProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  download: () => void;
  disabled: boolean
}

 const DownloadButton: React.FC<DownloadButtonProps> = ({
  download,
  disabled
}) => {

  return (
    <div
    className={`downloadButton ${disabled ? 'disabled':'' }`}
    onClick={download}
    >
        Save
    </div>
  );
};

export default DownloadButton
