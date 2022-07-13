import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImageProduct, registerProduct, editProduct } from '../../_actions/product_action';
import useInputs from '../../hooks/useInputs';

import { GrClose } from "react-icons/gr";
import { CgSpinner } from "react-icons/cg";
import { CloseButton, ButtonBox, Button } from "../../styles/shopping/PopupStyle";

import InputForm from './InputForm';
import ImageUpload from './ImageUpload';

function PostUpload({ 
  auth, username, isUpload, setIsUpload, isEdit, setIsEdit
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(state=> state.product.productInfo && state.product.productInfo.productInfo);
  const [ images, setImages ] = useState(isEdit ? product.images.map(image=> image.file) : []);
  const [ isSubmit, setIsSubmit ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ err, setErr ] = useState({});

  //Form Values
  const initValue = {
    title : isEdit ? product.title : "",
    category1 : isEdit ? product.category.department : "",
    category2 : isEdit ? product.category.productType : "",
    price : isEdit ? product.price.amount : 0,
    currency : isEdit ? product.price.currency : "dollar",
    desc : isEdit ? product.desc : "",
    tags : isEdit ? product.tags : []
  };
  const { values, setValues, handleChange } = useInputs(initValue);
  const [ filterValues, setFilterValues ] = useState(isEdit ? product.images : []);
  
  const props = {
    auth, isEdit, isUpload, err, product,
    images, setImages, 
    values, setValues, handleChange,
    filterValues, setFilterValues,
  };

  //폼 유효성 검사
  const checkForm = useCallback(()=> {
    let errors = {};
    const body = {
      store : auth.store._id,
      title : values.title,
      category : {
        department : 
          (values.category1) && parseInt(values.category1),
        productType : 
          (typeof values.category2 === "number") 
          ? parseInt(values.category2)
          : values.category2
      },
      price : {
        amount : parseInt(values.price),
        currency : values.currency
      },
      desc : values.desc,
      images : filterValues,
      tags : values.tags 
    };

    if(!body.title) {
      errors.title = "Please fill in the blank.";
    };
    if(!body.desc) {
      errors.desc = "Please fill in the blank.";
    }
    if(!body.price.amount || body.price.amount === 0) {
      errors.price = "Price should be more than 0.";
    }
    if(body.images.length === 0) {
      errors.images = "You should upload at least one product image.";
    }
    if(!body.category.department || !body.category.productType) {
      errors.category = "Please select a category.";
    }

    return { errors, body };
  }, [values, filterValues]);

  //form: onSubmit
  //POST 버튼 클릭시 submit 여부 판단
  const handleSubmit = (e)=> {
    e.preventDefault();

    setIsSubmit(true);

    const isError = (Object.keys(checkForm().errors).length > 0);
    if(!isError) {
      setSuccess(true);
      setIsLoading(true);
    }
  };

  //서버 이미지 파일 (여러개) 삭제
  const deleteImages = ()=> {
    if(images.length > 0) {
      let targetImage = [];

      if(isEdit) {
        //새로 추가된 이미지 파일만 삭제 (편집 모드)
        const oldImages = product.images;
        const newImages = (images, oldImages)=> {
          const target = images.filter(image=> {
            return !oldImages.some(oldImage=> {
              return image.fileName === oldImage.file.fileName;
            })
          });

          return target.map(img=> img.fileName);
        };
        targetImage = newImages(images, oldImages);
      }

      if(isUpload) {
        targetImage = images.map((image)=> image.fileName);
      }

      const body = { targetImage };
  
      dispatch(deleteImageProduct(body))
      .then(response=> {
        const data = response.payload;
  
        if(!data.success) {
          console.error(data.err);
        }
      });
    };
  };

  //팝업창 닫기 클릭시
  const closePopup = ()=> {
    if(window.confirm("Are you sure you want to cancel posting?")) {
      if(isUpload) {
        setIsUpload(false);
      }
      
      if(isEdit) {
        setIsEdit(false);
        navigate(`/${username}/shopping`);
      }
      
      deleteImages();
    }
  };

  //브라우저 이탈시 경고창 띄우기
  useEffect(()=> {
    const notify = (e)=> {
      e.preventDefault();
      e.returnValue = true;
    };

    window.addEventListener("beforeunload", notify);

    return ()=> window.removeEventListener("beforeunload", notify);
  }, []);

  //실시간 유효성 검사 (POST버튼 클릭 이후 작동)
  useEffect(()=> {
    if(isSubmit) {
      setErr(checkForm().errors);
    }
  }, [values, filterValues, isSubmit]);
  
  //포스트 업로드
  useEffect(()=> {
    const isError = (Object.keys(err).length > 0);

    if(success && !isError) {
      const body = checkForm().body;

      //기존 포스트 수정하는 경우 body 변경
      if(isEdit) {
        body._id = product._id;
        body.username = username;

        //사용자가 삭제한 기존의 이미지 서버에서도 삭제
        const oldImages = product.images;
        const targetImages = oldImages.filter(oldImage=> {
          let missingImages = images.findIndex(image=> {
            return oldImage.file.fileName === image.fileName; 
          });

          return missingImages === -1;
        });

        body.targetImage = targetImages.map(image=> image.file.fileName);
      }

      //서버에 등록 및 수정
      dispatch(isEdit ? editProduct(body) : registerProduct(body))
      .then(response=> {
        const data = response.payload;

        if(data.success) {
          setIsLoading(false);
          
          const timer = setTimeout(()=> {
            alert(`You have successfully ${isEdit ? "edit" : "post"}ed a product!`);
            window.location.replace(`/${username}/shopping`);
          }, 100);
          return ()=> clearTimeout(timer);
        } else {
          setIsLoading(false);

          const timer = setTimeout(()=> {
            alert(`An attempt to ${isEdit ? "edit" : "upload"} a post has failed. Please try again.`);
          }, 100);
          return ()=> clearTimeout(timer);
        }
      });
    }
  }, [success, isUpload, isEdit]);

  return (
    <>
      <ImageUpload {...props} />
      <form 
        onSubmit={handleSubmit}
        onKeyDown={(e)=> {
          if(e.key==="Enter") e.preventDefault();
        }}
      >
        <InputForm {...props} />
        <ButtonBox>
          <Button 
            type="button"
            btnType="cancel"
            onClick={closePopup}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            btnType="submit"
            disabled={success}
          >
            {isLoading
            ? <CgSpinner />
            : isEdit ? "Save" : "Post"
            }
          </Button>
        </ButtonBox>
      </form>

      <CloseButton
        onClick={closePopup}
        aria-label="Close"
      >
        <GrClose />
      </CloseButton>
    </>
  )
}

export default PostUpload;