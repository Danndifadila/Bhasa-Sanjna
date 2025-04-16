// import React from "react";
// import { Upload } from "lucide-react";

// /**
//  * Component for uploading media files
//  *
//  * @param {Object} props
//  * @param {Function} props.onUpload - Callback function when media is uploaded
//  */
// const MediaUploader = ({ onUpload }) => {
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type === "video/mp4") {
//       onUpload(file);
//     }
//   };

//   return (
//     <div className="w-full py-2 flex justify-center">
//       <label className="flex items-center justify-center bg-gray-200 rounded-3xl py-2 px-4 cursor-pointer text-sm h-20 w-60">
//         {/* <Plus className="h-5 w-5 mr-2" /> */}
//         <span className="text-xl font-medium">Upload Media</span>
//         <Upload className="h-8 w-8 ml-3" />
//         <input
//           type="file"
//           accept="video/mp4"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </label>
//     </div>
//   );
// };

// export default MediaUploader;
