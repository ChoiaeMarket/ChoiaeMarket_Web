import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 68px;
`;

export function Detail() {
  const { idol, product, order } = useParams();
  const location = useLocation();
  const detail = location.state && location.state.detail; // 전달된 상태 받기

  return (
    <Wrapper>
      <div>idol: {idol}</div>
      <div>product: {product}</div>
      <div>order: {order}</div>
      <div>detail: {detail.idol}</div>
      <div>{detail.idol}</div>
      <div>{detail.type}</div>
      <div>{detail.name}</div>
      <div>{detail.title}</div>
      <div>{detail.content}</div>
      <div>{detail.id}</div>
      <div>{detail.date}</div>
      <div>{detail.price}</div>
      <div>{detail.chats}</div>
      <div>{detail.likes}</div>
      <div>{detail.order}</div>
      <div>{detail.sold}</div>

      {/* <div>data : {data.idol}</div> */}
    </Wrapper>
  );
}
