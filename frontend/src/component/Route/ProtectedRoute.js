import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({isAdmin,adminRoute,children}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);


  if(!isAuthenticated){
    return(
      <Fragment>
        {loading ===false && (
        <Navigate to={"/login"}/>
        )}
      </Fragment>
        
    )
  }

  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/account" />;
  }
  if (adminRoute &&  !isAdmin) {
    return <Navigate to="/account" />;
  }

  return children ? children : <Outlet/>
  // return (
  //   <Fragment>
  //     {loading === false && (
        // <Route
        //   {...rest}
        //   render={(props) => {
        //     if (isAuthenticated === false) {
        //       return <Navigate to="/login" />;
        //     }

            // if (isAdmin === true && user.role !== "admin") {
            //   return <Navigate to="/login" />;
            // }

        //     return <Component {...props} />;
        //   }}
        // />

    //     {isAuthenticated ? <Outlet/> : <Navigate to="/login"/>}
    //   )}
    // </Fragment>
  // );
};

export default ProtectedRoute;
