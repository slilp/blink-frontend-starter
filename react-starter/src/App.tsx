import React, { Suspense } from "react";
import mainRoutes from "routes/mainRoutes";
import { Switch, Route, Redirect } from "react-router-dom";
import useAuth from "hooks/auth/useAuth";
import ResetCSS from "utils/ResetCSS";

function App() {
  const { user } = useAuth();
  const { guestRoute, userRoute } = mainRoutes;

  return (
    <div>
      <Suspense fallback={<div>LOADING...</div>}>
        <ResetCSS styles={{}} />
        {user ? (
          <Switch>
            {userRoute.routes.map((route: any, idx: number) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={true}
                    render={(props) => <route.component {...props} />}
                  />
                )
              );
            })}
            <Route path="*">
              <Redirect to={userRoute.redirect.path}></Redirect>
            </Route>
          </Switch>
        ) : (
          <>
            <Switch>
              {guestRoute.routes.map((route: any, idx: number) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={true}
                      render={(props) => <route.component {...props} />}
                    />
                  )
                );
              })}
              <Route path="*">
                <Redirect to={guestRoute.redirect.path}></Redirect>
              </Route>
            </Switch>
          </>
        )}
      </Suspense>
    </div>
  );
}

export default App;
