import { jsx, jsxs } from "react/jsx-runtime";
import { isbot } from "isbot";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter, useParams, useLoaderData, useActionData, useMatches, useRouteError, Outlet, isRouteErrorResponse, createCookie, Meta, Links, ScrollRestoration, Scripts, redirect, data, useNavigation, Form } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { createElement, Suspense } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url, abortDelay: ABORT_DELAY }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useRouteError();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else {
    message = "Sorry, something unknown went wrong";
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const stylesheet = "/assets/app-CpjZmc13.css";
const userCookie = createCookie("user", { httpOnly: true, path: "/", maxAge: 200 });
const isAuthenticated = async (request) => {
  const cookieHeader = request.headers.get("Cookie");
  const user = await userCookie.parse(cookieHeader);
  return user !== null;
};
const cookies_server = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isAuthenticated,
  userCookie
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [{
    title: "React Router Starter"
  }, {
    name: "description",
    content: "Welcome to React Router Starter!"
  }];
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: stylesheet
}];
async function loader$2({
  request
}) {
  const isLoggedIn = await isAuthenticated(request);
  return {
    isLoggedIn
  };
}
const _default = withComponentProps(function Layout({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "antialiased flex flex-col h-dvh",
      children: [/* @__PURE__ */ jsx("main", {
        id: "app-content",
        className: "flex-1",
        children: /* @__PURE__ */ jsx(Outlet, {})
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _default,
  links,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function Welcome() {
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-16 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-16 min-h-0", children: [
    /* @__PURE__ */ jsx("header", { className: "flex flex-col items-center gap-9", children: /* @__PURE__ */ jsxs("div", { className: "w-[500px] max-w-[100vw] p-4", children: [
      /* @__PURE__ */ jsx("img", { src: "/images/logo-light.svg", alt: "React Router", className: "block w-full dark:hidden" }),
      /* @__PURE__ */ jsx("img", { src: "/images/logo-dark.svg", alt: "React Router", className: "hidden w-full dark:block" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[300px] w-full space-y-6 px-4" })
  ] }) });
}
async function loader$1({
  request
}) {
  const {
    isAuthenticated: isAuthenticated2
  } = await Promise.resolve().then(() => cookies_server);
  const flag = await isAuthenticated2(request);
  if (!flag) return redirect("/login", {
    status: 302
  });
  const timePromise = new Promise((resolve) => setTimeout(() => resolve((/* @__PURE__ */ new Date()).toISOString()), 1e3));
  return {
    time: timePromise
  };
}
const home = withComponentProps(function Home() {
  const handleLogout = async () => {
    await fetch("/logout", {
      method: "POST"
    });
    window.location.href = "/login";
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "absolute inset-0",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
      })]
    }), /* @__PURE__ */ jsx("nav", {
      className: "relative z-10 p-6",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto flex justify-between items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-2",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-xl font-bold text-white",
            children: "Dashboard"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
          }), /* @__PURE__ */ jsx("button", {
            onClick: handleLogout,
            className: "px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all duration-200",
            children: "Logout"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs("main", {
      className: "relative z-10 max-w-7xl mx-auto px-6 py-12",
      children: [/* @__PURE__ */ jsx("div", {
        className: "text-center mb-16",
        children: /* @__PURE__ */ jsx("div", {
          className: "backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl",
          children: /* @__PURE__ */ jsx(Welcome, {})
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12",
        children: [/* @__PURE__ */ jsx("div", {
          className: "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-white/70 text-sm",
                children: "Active Users"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-2xl font-bold text-white",
                children: "2,543"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6 text-white",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                })
              })
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-white/70 text-sm",
                children: "Revenue"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-2xl font-bold text-white",
                children: "$12,847"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6 text-white",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                })
              })
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-white/70 text-sm",
                children: "Growth"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-2xl font-bold text-white",
                children: "+24.5%"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6 text-white",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                })
              })
            })]
          })
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "text-center",
        children: /* @__PURE__ */ jsxs("div", {
          className: "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 inline-block",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-xl font-semibold text-white mb-4",
            children: "Current Time"
          }), /* @__PURE__ */ jsx(Suspense, {
            fallback: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-center space-x-2",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-4 h-4 bg-white/30 rounded-full animate-pulse"
              }), /* @__PURE__ */ jsx("div", {
                className: "w-4 h-4 bg-white/30 rounded-full animate-pulse delay-100"
              }), /* @__PURE__ */ jsx("div", {
                className: "w-4 h-4 bg-white/30 rounded-full animate-pulse delay-200"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-white/60 ml-2",
                children: "Loading time..."
              })]
            })
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-xl font-semibold text-white mb-4",
            children: "Quick Actions"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-3",
            children: [/* @__PURE__ */ jsx("button", {
              className: "w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-left transition-all duration-200 border border-white/10",
              children: "Create New Project"
            }), /* @__PURE__ */ jsx("button", {
              className: "w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-left transition-all duration-200 border border-white/10",
              children: "View Analytics"
            }), /* @__PURE__ */ jsx("button", {
              className: "w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-left transition-all duration-200 border border-white/10",
              children: "Manage Users"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-xl font-semibold text-white mb-4",
            children: "Recent Activity"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center space-x-3",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center",
                children: /* @__PURE__ */ jsx("div", {
                  className: "w-2 h-2 bg-white rounded-full"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-white text-sm",
                  children: "New user registered"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-white/60 text-xs",
                  children: "2 minutes ago"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center space-x-3",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center",
                children: /* @__PURE__ */ jsx("div", {
                  className: "w-2 h-2 bg-white rounded-full"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-white text-sm",
                  children: "Payment processed"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-white/60 text-xs",
                  children: "5 minutes ago"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center space-x-3",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center",
                children: /* @__PURE__ */ jsx("div", {
                  className: "w-2 h-2 bg-white rounded-full"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-white text-sm",
                  children: "Report generated"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-white/60 text-xs",
                  children: "10 minutes ago"
                })]
              })]
            })]
          })]
        })]
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function meta$1() {
  return [{
    title: "Login"
  }];
}
async function action$1({
  request
}) {
  const {
    email,
    password
  } = Object.fromEntries(await request.formData());
  const message = "Invalid credentials, try again.";
  const isValidCredentials = email === "admin@test.com" && password === "abc123";
  await new Promise((res) => setTimeout(res, 1e3));
  console.log("[login]", {
    email,
    password
  });
  if (!isValidCredentials) return data({
    message
  }, {
    status: 400
  });
  return redirect("/", {
    status: 302,
    headers: {
      "Set-Cookie": await userCookie.serialize("user-test")
    }
  });
}
const login = withComponentProps(function Login({
  actionData
}) {
  const navigation = useNavigation();
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "absolute inset-0 overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-1/3 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "relative w-full max-w-md",
      children: [actionData && /* @__PURE__ */ jsx("div", {
        className: "mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-3",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex-shrink-0",
            children: /* @__PURE__ */ jsx("svg", {
              className: "w-5 h-5 text-red-300",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              })
            })
          }), /* @__PURE__ */ jsx("p", {
            className: "text-red-100 text-sm font-medium",
            children: "Sorry for that, try again in few minutes, please."
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-8",
          children: [/* @__PURE__ */ jsx("div", {
            className: "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl mb-4 shadow-lg",
            children: /* @__PURE__ */ jsx("svg", {
              className: "w-8 h-8 text-white",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              })
            })
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-white mb-2",
            children: "Welcome Back"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-white/70",
            children: "Sign in to your account"
          })]
        }), /* @__PURE__ */ jsxs(Form, {
          id: "loginForm",
          method: "post",
          action: "/login",
          className: "space-y-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "group",
            children: [/* @__PURE__ */ jsx("label", {
              htmlFor: "email",
              className: "block text-sm font-medium text-white/90 mb-2 pl-1",
              children: "Email Address"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative",
              children: [/* @__PURE__ */ jsx("input", {
                id: "email",
                type: "email",
                name: "email",
                maxLength: 120,
                required: true,
                className: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 group-hover:border-white/30",
                placeholder: "Enter your email"
              }), /* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "group",
            children: [/* @__PURE__ */ jsx("label", {
              htmlFor: "password",
              className: "block text-sm font-medium text-white/90 mb-2 pl-1",
              children: "Password"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative",
              children: [/* @__PURE__ */ jsx("input", {
                id: "password",
                type: "password",
                name: "password",
                maxLength: 40,
                required: true,
                className: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 group-hover:border-white/30",
                placeholder: "Enter your password"
              }), /* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "text-right",
            children: /* @__PURE__ */ jsx("a", {
              href: "#",
              className: "text-sm text-white/70 hover:text-white transition-colors duration-200 underline decoration-white/30 hover:decoration-white/70",
              children: "Forgot password?"
            })
          }), /* @__PURE__ */ jsx("button", {
            type: "submit",
            disabled: navigation.state === "submitting",
            className: "w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-white/30",
            children: navigation.state === "submitting" ? /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-center space-x-2",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
              }), /* @__PURE__ */ jsx("span", {
                children: "Signing In..."
              })]
            }) : "Sign In"
          }), /* @__PURE__ */ jsx("div", {
            className: "text-center mt-6",
            children: /* @__PURE__ */ jsxs("p", {
              className: "text-white/70",
              children: ["Don't have an account?", " ", /* @__PURE__ */ jsx("a", {
                href: "/register",
                className: "text-white font-medium hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/80",
                children: "Create account"
              })]
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-xs text-white/60 text-center mb-2",
              children: "Demo Credentials:"
            }), /* @__PURE__ */ jsxs("div", {
              className: "text-xs text-white/80 space-y-1",
              children: [/* @__PURE__ */ jsxs("p", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-white/60",
                  children: "Email:"
                }), " admin@test.com"]
              }), /* @__PURE__ */ jsxs("p", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-white/60",
                  children: "Password:"
                }), " abc123"]
              })]
            })]
          })]
        })]
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: login,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta() {
  return [{
    title: "Register"
  }];
}
async function action({
  request
}) {
  await new Promise((res) => setTimeout(res, 1e3));
  const formData = await request.formData();
  const data2 = Object.fromEntries(formData);
  console.log("[register]", data2);
  return redirect("/login");
}
const register = withComponentProps(function Register() {
  const navigation = useNavigation();
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "absolute inset-0 overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "relative w-full max-w-md",
      children: /* @__PURE__ */ jsxs("div", {
        className: "backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-8",
          children: [/* @__PURE__ */ jsx("div", {
            className: "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl mb-4 shadow-lg",
            children: /* @__PURE__ */ jsx("svg", {
              className: "w-8 h-8 text-white",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              })
            })
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-white mb-2",
            children: "Create Account"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-white/70",
            children: "Join us and start your journey"
          })]
        }), /* @__PURE__ */ jsxs(Form, {
          id: "registerForm",
          method: "post",
          action: "/register",
          className: "space-y-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "group",
            children: [/* @__PURE__ */ jsx("label", {
              htmlFor: "name",
              className: "block text-sm font-medium text-white/90 mb-2 pl-1",
              children: "Full Name"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative",
              children: [/* @__PURE__ */ jsx("input", {
                id: "name",
                type: "text",
                name: "name",
                maxLength: 40,
                required: true,
                className: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 group-hover:border-white/30",
                placeholder: "Enter your full name"
              }), /* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "group",
            children: [/* @__PURE__ */ jsx("label", {
              htmlFor: "email",
              className: "block text-sm font-medium text-white/90 mb-2 pl-1",
              children: "Email Address"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative",
              children: [/* @__PURE__ */ jsx("input", {
                id: "email",
                type: "email",
                name: "email",
                maxLength: 120,
                required: true,
                className: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 group-hover:border-white/30",
                placeholder: "Enter your email"
              }), /* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "group",
            children: [/* @__PURE__ */ jsx("label", {
              htmlFor: "password",
              className: "block text-sm font-medium text-white/90 mb-2 pl-1",
              children: "Password"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative",
              children: [/* @__PURE__ */ jsx("input", {
                id: "password",
                type: "password",
                name: "password",
                maxLength: 40,
                required: true,
                className: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 group-hover:border-white/30",
                placeholder: "Create a password"
              }), /* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              })]
            })]
          }), /* @__PURE__ */ jsx("button", {
            type: "submit",
            disabled: navigation.state === "submitting",
            className: "w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-white/30",
            children: navigation.state === "submitting" ? /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-center space-x-2",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
              }), /* @__PURE__ */ jsx("span", {
                children: "Creating Account..."
              })]
            }) : "Create Account"
          }), /* @__PURE__ */ jsx("div", {
            className: "text-center mt-6",
            children: /* @__PURE__ */ jsxs("p", {
              className: "text-white/70",
              children: ["Already have an account?", " ", /* @__PURE__ */ jsx("a", {
                href: "/login",
                className: "text-white font-medium hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/80",
                children: "Sign in"
              })]
            })
          })]
        })]
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: register,
  meta
}, Symbol.toStringTag, { value: "Module" }));
async function loader() {
  return redirect("/", {
    status: 302,
    headers: {
      "Set-Cookie": await userCookie.serialize("", {
        path: "/",
        maxAge: -1
      })
    }
  });
}
const logout = withComponentProps(function Logout() {
  return null;
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: logout,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-8iedocLc.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-D52XG6IA-DpjpyusN.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-V0UV8EnO.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-D52XG6IA-DpjpyusN.js", "/assets/with-props-TcqG6FRE.js"], "css": [] }, "layouts/default": { "id": "layouts/default", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/default-BRB8xktX.js", "imports": ["/assets/with-props-TcqG6FRE.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-D52XG6IA-DpjpyusN.js"], "css": [] }, "routes/home": { "id": "routes/home", "parentId": "layouts/default", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-DLNnw7yJ.js", "imports": ["/assets/with-props-TcqG6FRE.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-D52XG6IA-DpjpyusN.js"], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "layouts/default", "path": "/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-CArMoqLU.js", "imports": ["/assets/with-props-TcqG6FRE.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-D52XG6IA-DpjpyusN.js"], "css": [] }, "routes/register": { "id": "routes/register", "parentId": "layouts/default", "path": "/register", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/register-D5eI5xbf.js", "imports": ["/assets/with-props-TcqG6FRE.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-D52XG6IA-DpjpyusN.js"], "css": [] }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "/logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-Dr7zQgKI.js", "imports": ["/assets/with-props-TcqG6FRE.js", "/assets/chunk-D52XG6IA-DpjpyusN.js"], "css": [] } }, "url": "/assets/manifest-2520ee8f.js", "version": "2520ee8f" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "layouts/default": {
    id: "layouts/default",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "layouts/default",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/login": {
    id: "routes/login",
    parentId: "layouts/default",
    path: "/login",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/register": {
    id: "routes/register",
    parentId: "layouts/default",
    path: "/register",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "/logout",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
