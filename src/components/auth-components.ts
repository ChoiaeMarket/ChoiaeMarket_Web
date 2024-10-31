import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  height: 100%;
  min-height: 99vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 50px;
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Back = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  left: 0;
  cursor: pointer;
`;

export const Title = styled.h1`
  text-align: center;
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  line-height: 56px;
  letter-spacing: -0.025em;
`;

export const Form = styled.form`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  & > input[type="submit"] {
    margin: 12px 0 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.025em;
    box-shadow: 0 0 0 1px #252932;
    background-color: #f89e86;
    color: #ffffff;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
      background-color: #f9b19e;
    }
  }
  & > div > input[type="submit"] {
    margin: 12px 0 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.025em;
    box-shadow: 0 0 0 1px #252932;
    background-color: #f89e86;
    color: #ffffff;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
      background-color: #f9b19e;
    }
  }
`;

export const Div = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
`;

export const Input = styled.input<{ hasValue: boolean }>`
  width: 100%;
  height: 60px;
  border: 1px solid #252932;
  border-radius: 16px;
  padding: 19px;
  margin: 8px 0 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #ffffff;
  box-shadow: ${(props) =>
    props.hasValue ? " 0 0 0 1px #9ea3b2" : " 0 0 0 1px #252932"};
  background-color: #252932;
  outline: none;
  &::placeholder {
    color: #777c89;
  }
  &:focus {
    box-shadow: 0 0 0 1px #f89e86;
    background-color: rgba(248, 158, 134, 0.1);
  }
  /* 자동완성이 될 때 배경색 변경 */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #252932 inset, 0 0 0 1px #9ea3b2;
    -webkit-text-fill-color: #ffffff !important;
    caret-color: #ffffff !important;
  }
`;

export const Error = styled.span`
  top: 100px;
  font-weight: 600;
  color: tomato;
  position: absolute;
`;

export const SocialLoginBox = styled.div`
  width: 170px;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

export const SocialLogin = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 16px;
  border: solid 1px #35383f;
  background-color: #1f222a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #3b3f4a;
  }
  & img {
    width: 24px;
    height: 24px;
  }
`;

export const Switcher = styled.div`
  margin: 138px 0 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
`;

export const SwitcherLink = styled(Link)`
  padding-left: 12px;
  font-weight: 600;
  text-decoration: underline;
  color: #f89e86;
  cursor: pointer;
`;
