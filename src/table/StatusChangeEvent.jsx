
// "use client"
// import React, { useState } from "react";

// import Modal from "@/components/ui/Modal";
// import { useSelector, useDispatch } from "react-redux";



// import { setEventStatusModal, setEvents } from "../store";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import LoadingIcon from "../../../ems-landing-page/LoadingIcon/LoadingIcon";

// const StatusChangeEvent = () => {
//   const { eventStatusModal, eventStatusModalData } = useSelector(
//     (state) => state.events
//   );
//   const [loading,setLoading]=useState(false);

//   const dispatch = useDispatch();
//   const id = localStorage.getItem("id");
//   return (
//     <div>
//       <ToastContainer
//         style={{
//           zIndex: 111111,
//         }}
//       />
//       <Modal
//         title={
//           eventStatusModalData.status === false
//             ? "Deactivate This Mela"
//             : "Activate This Mela"
//         }
//         labelclassName="btn-outline-dark"
//         activeModal={eventStatusModal}
//         onClose={() => dispatch(setEventStatusModal(false))}
//         footerContent={
//           <>
//             <button
//               className="btn btn inline-flex justify-center   
        
//         btn-success"
//               onClick={async () => {
//                 setLoading(true);
//                 const config = {
//                   headers: {
//                     Authorization: `Bearer ${JSON.parse(
//                       localStorage.getItem("token")
//                     )}`,
//                   },
//                 };

//                 await axios
//                   .get(
//                     `
//                 ${import.meta.env.VITE_BACKEND_URL}/auth/api/v1/events/cancel/${
//                       eventStatusModalData.id
//                     }`,
//                     config
//                   )
//                   .then((res) => {
//                     const configGet = {
//                       headers: {
//                         Authorization: `Bearer ${JSON.parse(
//                           localStorage.getItem("token")
//                         )}`,
//                       },
//                     };
//                     axios
//                       .get(
//                         `${
//                           import.meta.env.VITE_BACKEND_URL
//                         }/auth/api/v1/events/users/${id}`,
//                         config
//                       )

//                       .then((response) => {
//                         dispatch(setEvents(response.data));
//                         dispatch(setEventStatusModal(false));
//                         setLoading(false);
//                       })
//                       .catch((error) => {
//                         console.log(error);
//                         setLoading(false);
//                       });
//                   });
//               }}
//             >
//               {eventStatusModalData.status === false ? "Yes" : "Yes"}
//             </button>
//             <button
//               className="ml-4 btn btn btn-danger inline-flex justify-center btn-secondary"
//               onClick={() => dispatch(setEventStatusModal(false))}
//             >
//               No
//             </button>
//           </>
//         }
//       >
//         <div className="text-base text-slate-600 dark:text-slate-300">
//            {loading?<LoadingIcon />:""}
//           <h6>
//             Do you want to{" "}
//             {eventStatusModalData.status === false ? "Deactivate" : "Activate"}{" "}
//             this Mela
//           </h6>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default StatusChangeEvent;
