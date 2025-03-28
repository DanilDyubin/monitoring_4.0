// import { useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDropzone } from 'react-dropzone';
// import { useUploadImages } from '../../hooks/useUploadImages';
// import Button from '../../ui/button/Button';

// import s from './uploadImages.module.scss';

// const UploadImages = () => {
//   const navigate = useNavigate();
//   const { uploadImages } = useUploadImages();

//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles.length) {
//       uploadImages(acceptedFiles);
//       navigate('/form');
//     }
//   }, []);

//   const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'image/*': [], // все типы изображений
//     },
//     noClick: true,
//     noKeyboard: true,
//   });

//   return (
//     <section className="container">
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <div className={s['images-upload']}>
//             <div className={s['images-upload__overlay']}>Отпустите файлы</div>
//             <h3 className={s['images-upload__title']}>
//               Перетащите фотографии сюда
//               <br /> или
//             </h3>
//             <Button title="Выберите файл" />
//           </div>
//         ) : (
//           <div className={s['images-upload']}>
//             <h3 className={s['images-upload__title']}>
//               Перетащите фотографии сюда
//               <br /> или
//             </h3>
//             <Button
//               title="Выберите файл"
//               variant="secondaryHovered"
//               onClick={open}
//             />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default UploadImages;
