import { Col, Row } from "antd";
import { BasicContent } from "@/components/basicContent";
import CardList from "./components/cardList";


export default function Home() {
  return (
    <BasicContent>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <CardList />
        </Col>
      </Row>
    </BasicContent>
  );
}
