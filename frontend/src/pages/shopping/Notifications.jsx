// import { getAdminOrderDetails } from '@/store/admin/orderSlice'
import socket from '@/store/socket'
import { addNotification } from '@/store/user/notificationSlice';
import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const Notifications = () => {
   // const [notifications, setNotifications] = useState([]);
   const { user } = useSelector((state) => state.auth);
   const notifications = useSelector (state => state.notifications.notifications)
   const dispatch = useDispatch()

   useEffect(() => {
      // console.log("🔍 Redux User:", user);

      if (user && user.id) {
         socket.connect();
         // console.log("✅ Emitting join event for:", user.id);
         socket.emit("join", user.id);

         socket.on("notification", (message) => {
            console.log("📩 New Notification:", message);
            dispatch(addNotification(message))
         });

         return () => {
            socket.off("notification");
            socket.disconnect();
         };
      }
   }, [user, dispatch]);

   return (
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-7 rounded-xl">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4 underline decoration-primary-300 decoration-3 underline-offset-4">
            Notifications
          </h1>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-8 space-y-6 ring-2 ring-primary-300">
          <ul className="divide-y divide-gray-200">
            {notifications.length > 0 ? (
              notifications.map((msg, index) => (
                <li key={index} className="p-4 text-gray-800">
                  {msg}
                </li>
              ))
            ) : (
              <p className="text-gray-600 text-center">No new notifications</p>
            )}
          </ul>
        </div>
      </div>
    </div>
   )
}

export default Notifications