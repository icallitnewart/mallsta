import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteImageProduct, registerProduct } from '../../_actions/product_action';
import useInputs from '../../hooks/useInputs';

import { GrClose } from "react-icons/gr";
import { CgSpinner } from "react-icons/cg";
import { CloseButton, ButtonBox, Button } from "../../styles/shopping/PopupStyle";

import InputForm from './InputForm';
import ImageUpload from './ImageUpload';

function PostUpload({ authUser, setIsUpload, username }) {
  const dispatch = useDispatch();
  const [ images, setImages ] = useState([]);
  const [ isSubmit, setIsSubmit ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ err, setErr ] = useState({});

  //Form Values
  const initValue = {
    title : "",
    category1 : "",
    category2 : "",
    price : 0,
    currency : "dollar",
    desc : "",
    tags : []
  };
  const { values, setValues, handleChange } = useInputs(initValue);
  const [ filterValues, setFilterValues ] = useState([]);
  

  //폼 유효성 검사
  const checkForm = useCallback(()=> {
    let errors = {};
    const body = {
      store : authUser.userData.store._id,
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
      const targetImage = images.map((image)=> image.fileName);
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
    setIsUpload(false);
    deleteImages();
  };

  //브라우저 이탈시 업로드한 이미지 자동 삭제
  useEffect(()=> {
    window.addEventListener("beforeunload", deleteImages);

    return ()=> window.removeEventListener("beforeunload", deleteImages);
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

      dispatch(registerProduct(body))
      .then(response=> {
        const data = response.payload;

        if(data.success) {
          setIsLoading(false);
          
          const timer = setTimeout(()=> {
            alert("You have successfully posted a product!");
            window.location.replace(`/${username}/shopping`);
          }, 100);
          return ()=> clearTimeout(timer);
        } else {
          setIsLoading(false);

          const timer = setTimeout(()=> {
            alert("An attempt to upload a post has failed. Please try again.");
          }, 100);
          return ()=> clearTimeout(timer);
        }
      });
    }
  }, [success]);

  return (
    <>
      <ImageUpload 
        images={images}
        setImages={setImages}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        err={err}
      />

      <form 
        onSubmit={handleSubmit}
        onKeyDown={(e)=> {
          if(e.key==="Enter") e.preventDefault();
        }}
      >
        <InputForm 
          authUser={authUser}
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          err={err}
        />

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
            : "Post"
            }
          </Button>
        </ButtonBox>
      </form>

      <CloseButton
        onClick={closePopup}
        aria-label="Close Button"
      >
        <GrClose />
      </CloseButton>
    </>
  )
}

export default PostUpload;