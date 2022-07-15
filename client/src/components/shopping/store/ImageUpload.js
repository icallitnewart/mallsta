import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImageProduct, deleteImageProduct } from '../../../_actions/product_action';
import usePrevious from '../../../hooks/usePrevious';

import { GrClose } from "react-icons/gr";
import { FiUpload } from "react-icons/fi";
import { ImageBox, ImageBig, ThumbnailBox, ImageSmall, ImageFilter, FilterOption, UploadButton, ErrMsg } from "../../../styles/shopping/PopupStyle";

function ImageUpload({ 
  images, setImages, filterValues, setFilterValues, 
  isEdit, err, product 
}) {
  const dispatch = useDispatch();
  const file = useRef(null);
  const form = useRef(null);
  const prevImages = usePrevious(images);
  const [ activeIndex, setActiveIndex ] = useState(isEdit ? 0 : null);
  const [ activeImage, setActiveImage ] = useState(isEdit ? images[activeIndex] : null);

  //선택한 이미지 파일 삭제 (1개)
  const deleteImage = (targetIndex)=> {
    let newArr = [ ...images ];

    //프론트 이미지 삭제
    const removed = newArr.filter((image)=>  image.fileName !== images[targetIndex].fileName);
    setImages(removed);
    
    if(isEdit) {
      //기존의 이미지는 서버에서 삭제 방지 (포스트 submit할 때 삭제)
      const isExist = product.images.some(image=> {
        return (image.file.fileName === images[targetIndex].fileName);
      });

      if(isExist) return;
    }

    //서버 파일 삭제
    const body = {
      targetImage : [ newArr[targetIndex].fileName ]
    };

    dispatch(deleteImageProduct(body))
    .then(response=> {
      const data = response.payload;

      if(!data.success) {
        console.error(data.err);
      }
    });
  };

  //필터 옵션 변경
  const controlRange = (e)=> {
    const { name, value } = e.target;
    let newArr = [ ...filterValues ];
    
    newArr.forEach((item)=> {
      if(item.file === images[activeIndex]) {
        item.filter[name] = parseInt(value);
        setFilterValues(newArr);
      } 
    });
  };

  //input[type=file]: onChange
  const handleChange = (e)=> {
    const { value } = e.target;

    //cancel 클릭시 빈 string이 들어오는 것을 방지
    if(value) {
      form.current.dispatchEvent(new Event('submit'));
    }
  };

  //form: onSubmit 
  //이미지 업로드 기능
  const handleSubmit = ()=> {
    //이미지 최대 개수 제한
    const maxLen = 4;
    if(images.length === maxLen) {
      return alert("You can upload a maximum of 4 images.");
    }

    //서버에 파일 업로드
    const formData = new FormData();
    formData.append("file", file.current.files[0]);

    dispatch(uploadImageProduct(formData))
    .then(response=> {
      const data = response.payload;

      if(data.success) {
        const fileName = data.fileName;
        const filePath = data.filePath.split("client\\public")[1];

        //프론트 이미지 보여주기
        setImages(prev=> 
          [...prev, {
            fileName,
            filePath
          }
        ]);
      } else {
        alert(data.err);
      }
    });
  };

  //이미지 업로드/삭제시 filterValues, activeIndex 변경
  useEffect(()=> {
    if(prevImages) {
      //이미지 추가시
      if(prevImages.length < images.length) {
        let initValue = {};
        const initFilter = {
          brightness : 100,
          saturate : 100,
          contrast : 100
        };
    
        initValue.file = images[images.length - 1];
        initValue.filter = initFilter;
    
        setFilterValues(prev=> [...prev, initValue]);
        setActiveIndex(images.length - 1);
      } 
      //이미지 삭제시
      else {
        //남아있는 이미지가 없는 경우
        if(images.length === 0) {
          setFilterValues([]);
          setActiveIndex(null);
        } 
        //아직 다른 이미지가 남아있는 경우
        else { 
          let newArr = [...filterValues];
          const removed = newArr.filter((item)=> {
            return images.some((image)=> {
              return item.file.fileName === image.fileName;
            })
          });
  
          setFilterValues(removed);
          setActiveIndex(prev=> {
            //삭제한 이미지가 마지막 이미지인 경우에만 변경
            if(prev > images.length - 1) {
              return images.length - 1;
            } else {
              return prev;
            }
          });
        }
      }
    } 
  }, [images]);

  //activeIndex 변경시 ImageBig 경로 설정
  useEffect(()=> {
    if(images.length > 0) {
      setActiveImage(images[activeIndex]);
    } 
    //이미지 모두 삭제시
    else {
      setActiveImage(null);
    }
  }, [activeIndex, images]);

  return (
    <ImageBox>
      <ImageBig>
        {(activeImage) && 
        <img 
          src={process.env.PUBLIC_URL + activeImage.filePath} 
          alt={`Upload Image${activeIndex}`} 
          style={{ 
            filter: `
              brightness(${(filterValues.length > 0) && filterValues[activeIndex].filter.brightness}%) 
              contrast(${(filterValues.length > 0) && filterValues[activeIndex].filter.contrast}%) 
              saturate(${(filterValues.length > 0) && filterValues[activeIndex].filter.saturate}%)
            `
          }}
        />
        }
      </ImageBig>
      <ImageFilter>
        <FilterOption>
          <label htmlFor="brightness">
            Brightness
          </label>
          <input 
            type="range" 
            name="brightness" 
            id="brightness" 
            min="0"
            max="200"
            step="1"
            value={(filterValues.length > 0) ? filterValues[activeIndex].filter.brightness : 100}
            onChange={controlRange}
          />
          <span>
            {(!images.length > 0) ? "0%" : 
              `${(filterValues.length > 0) && 
                filterValues[activeIndex].filter.brightness - 100}%`
            }
          </span>
        </FilterOption>
        <FilterOption>
          <label htmlFor="saturate">
            Saturate
          </label>
          <input 
            type="range" 
            name="saturate" 
            id="saturate" 
            min="0"
            max="200"
            step="1"
            value={filterValues.length > 0 && filterValues[activeIndex].filter.saturate}
            onChange={controlRange}
          />
          <span>
            {(!images.length > 0) ? "0%" :  
              `${(filterValues.length > 0) && 
                filterValues[activeIndex].filter.saturate - 100}%`
            }
          </span>
        </FilterOption>
        <FilterOption>
          <label htmlFor="contrast">
            Contrast
          </label>
          <input 
            type="range" 
            name="contrast" 
            id="contrast" 
            min="0"
            max="200"
            step="1"
            value={filterValues.length > 0 && filterValues[activeIndex].filter.contrast}
            onChange={controlRange}
          />
          <span>
            {(!images.length > 0) ? "0%" : 
              `${(filterValues.length > 0) && 
                filterValues[activeIndex].filter.contrast - 100}%`
            }
          </span>
        </FilterOption>
      </ImageFilter>
      <ThumbnailBox>
        {(images.length > 0) && images.map((img, index)=> 
        <ImageSmall 
          key={index}
          isActive={index===activeIndex} 
        >
          <img 
            src={process.env.PUBLIC_URL + img.filePath} 
            onClick={()=> setActiveIndex(index)}
          />
          <span 
            onClick={()=> deleteImage(index)}
          >
            <GrClose />
          </span>
        </ImageSmall>
        )}
        <li>
          <form 
            encType="multipart/form-data"
            onSubmitCapture={handleSubmit}
            ref={form}
          >
            <UploadButton 
              htmlFor="imageUpload"
            >
              <span>Upload</span> 
              <FiUpload />
            </UploadButton>
            <input 
                type="file" 
                name="file"
                id="imageUpload"
                ref={file}
                className="hidden"
                onChange={handleChange} 
              />
            </form>
        </li>
      </ThumbnailBox>
      {err.images &&
          <ErrMsg direction={"up"}>
            <span>{err.images}</span>
          </ErrMsg>
        }
    </ImageBox>
  )
}

export default React.memo(ImageUpload);