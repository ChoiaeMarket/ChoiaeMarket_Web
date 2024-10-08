import { Link, useLocation } from "react-router-dom";
import useLoginUserStore from "../stores/login-user.store";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 68px;
  border-radius: 12px 12px 0 0;
  background-color: black;
`;

const Menu = styled.div`
  display: flex;
  height: 100%;
`;

const MenuItem = styled.div`
  width: 78px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function NavigationBar() {
  const location = useLocation();
  const { loginUser } = useLoginUserStore();

  return (
    <Wrapper>
      <Menu>
        <Link to="/">
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="23"
              viewBox="0 0 25 23"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.44063 8.9032L12.1195 2.22433L18.7984 8.9032H18.7969V20.0322H5.44206V8.9032H5.44063ZM3.21625 11.1276L1.57275 12.7711L0 11.1983L10.547 0.65137C11.4155 -0.217123 12.8236 -0.217123 13.6921 0.65137L24.239 11.1983L22.6663 12.7711L21.0227 11.1275V20.0322C21.0227 21.2615 20.0262 22.258 18.7969 22.258H5.44206C4.21278 22.258 3.21625 21.2615 3.21625 20.0322V11.1276Z"
                fill={
                  location.pathname === "/" ||
                  location.pathname.startsWith("/idol")
                    ? "#f89e86"
                    : "#999999"
                }
              />
            </svg>
          </MenuItem>
        </Link>
        <Link to="/cart">
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="22"
              viewBox="0 0 25 22"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.0013 1.7601e-05C15.4189 0 14.3988 0.188521 13.2295 0.760882C12.7966 0.972788 12.3904 1.22799 12.0132 1.52571C11.6505 1.24468 11.2606 1.0012 10.8456 0.795928C9.65357 0.206352 8.58119 0 7.05551 0C2.96936 0 0 3.38564 0 7.78278C0 11.1035 1.85154 14.3113 5.3003 17.4131C7.11054 19.0412 9.42184 20.6524 11.0771 21.5096L12.0242 22L12.9712 21.5096C14.6265 20.6524 16.9378 19.0412 18.748 17.4131C22.1968 14.3113 24.0483 11.1035 24.0483 7.78278C24.0483 3.43218 21.051 0.0167883 17.0013 1.7601e-05ZM21.8621 7.78278C21.8621 10.3844 20.3167 13.0619 17.2861 15.7876C15.6338 17.2736 13.5097 18.7587 12.0242 19.5379C10.5387 18.7587 8.41454 17.2736 6.76226 15.7876C3.73168 13.0619 2.18622 10.3844 2.18622 7.78278C2.18622 4.5339 4.24524 2.18621 7.05551 2.18621C8.26857 2.18621 9.01609 2.33005 9.87637 2.75555C10.3845 3.00688 10.8336 3.33875 11.2224 3.75348L12.0267 4.61149L12.8237 3.74668C13.2212 3.31534 13.677 2.97591 14.1906 2.72449C15.0257 2.31574 15.7265 2.18621 16.9968 2.18622C19.7723 2.19772 21.8621 4.57898 21.8621 7.78278Z"
                fill={
                  location.pathname.startsWith("/cart") ? "#f89e86" : "#999999"
                }
              />
            </svg>
          </MenuItem>
        </Link>
        <Link to="/upload">
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="5"
                y="11"
                width="14"
                height="2"
                rx="1"
                fill={
                  location.pathname.startsWith("/upload")
                    ? "#f89e86"
                    : "#999999"
                }
              />
              <rect
                x="13"
                y="5"
                width="14"
                height="2"
                rx="1"
                transform="rotate(90 13 5)"
                fill={
                  location.pathname.startsWith("/upload")
                    ? "#f89e86"
                    : "#999999"
                }
              />
              <rect
                x="1"
                y="1"
                width="22"
                height="22"
                rx="3"
                stroke={
                  location.pathname.startsWith("/upload")
                    ? "#f89e86"
                    : "#999999"
                }
                stroke-width="2"
              />
            </svg>
          </MenuItem>
        </Link>
        <Link to="/chat">
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M11 20.99H10.5664C8.97763 20.9184 7.42099 20.4628 6.02158 19.6556C6.021 19.6552 6.02043 19.6549 6.01985 19.6546L5.6637 19.4469L5.30377 19.237L4.90131 19.3448L1.83434 20.1662L2.6559 17.1013L2.76387 16.6985L2.55368 16.3383L2.34462 15.9801C2.34448 15.9798 2.34435 15.9796 2.34421 15.9794C1.46318 14.463 1 12.7374 1 10.995C1 5.48047 5.48186 1 11 1C16.5181 1 21 5.48047 21 10.995C21 16.5095 16.5181 20.99 11 20.99Z"
                stroke={
                  location.pathname.startsWith("/chat") ? "#f89e86" : "#999999"
                }
                stroke-width="2"
              />
            </svg>
          </MenuItem>
        </Link>
        {loginUser ? (
          <Link to={`/user/${loginUser.email}`}>
            <MenuItem>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM18.3995 16.1247C19.4086 14.6703 20 12.9042 20 11C20 6.02946 15.9706 2.00002 11 2.00002C6.02946 2.00002 2.00002 6.02946 2.00002 11C2.00002 12.9042 2.59139 14.6703 3.60049 16.1246C4.72412 14.6404 7.36206 14.002 10.9824 14C8.75164 13.9918 6.99997 12.4184 6.99997 9C6.99997 6.75576 8.57907 5 11 5C13.4142 5 15 6.92158 15 9.2C15 12.4709 13.2275 13.9919 11.0176 14C14.638 14.002 17.2759 14.6405 18.3995 16.1247ZM16.9647 17.7398C16.6721 16.6873 14.5694 16 11 16C7.43058 16 5.32796 16.6873 5.03529 17.7397C6.62328 19.1462 8.71194 20 11 20C13.2881 20 15.3767 19.1462 16.9647 17.7398ZM8.99999 9C8.99999 11.2693 9.8182 12 11 12C12.1777 12 13 11.2984 13 9.2C13 7.95041 12.2156 7 11 7C9.73373 7 8.99999 7.81582 8.99999 9Z"
                  fill={
                    location.pathname.startsWith("/user")
                      ? "#f89e86"
                      : "#999999"
                  }
                />
              </svg>
            </MenuItem>
          </Link>
        ) : (
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM18.3995 16.1247C19.4086 14.6703 20 12.9042 20 11C20 6.02946 15.9706 2.00002 11 2.00002C6.02946 2.00002 2.00002 6.02946 2.00002 11C2.00002 12.9042 2.59139 14.6703 3.60049 16.1246C4.72412 14.6404 7.36206 14.002 10.9824 14C8.75164 13.9918 6.99997 12.4184 6.99997 9C6.99997 6.75576 8.57907 5 11 5C13.4142 5 15 6.92158 15 9.2C15 12.4709 13.2275 13.9919 11.0176 14C14.638 14.002 17.2759 14.6405 18.3995 16.1247ZM16.9647 17.7398C16.6721 16.6873 14.5694 16 11 16C7.43058 16 5.32796 16.6873 5.03529 17.7397C6.62328 19.1462 8.71194 20 11 20C13.2881 20 15.3767 19.1462 16.9647 17.7398ZM8.99999 9C8.99999 11.2693 9.8182 12 11 12C12.1777 12 13 11.2984 13 9.2C13 7.95041 12.2156 7 11 7C9.73373 7 8.99999 7.81582 8.99999 9Z"
                fill={
                  location.pathname.startsWith("/user") ? "#f89e86" : "#999999"
                }
              />
            </svg>
          </MenuItem>
        )}
      </Menu>
    </Wrapper>
  );
}
