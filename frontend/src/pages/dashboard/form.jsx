import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import request from "../../helpers/request";

const FormEmployee = ({ type, setFormVisible, formEdited, fetchData }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = { name, age};

    if (type === 'create') {
      await request.post('employee', form)
      .then(() => fetchData())
      .catch((err) => console.log(err))
    } else {
      await request.put(`/employee/${formEdited.id}`, form)
      .then(() => fetchData())
      .catch((err) => console.log(err))
    }
    setFormVisible(false);
  };

//   meanggil data dari parent ke children pada edit
  useEffect(() => {
    if (type == "edit") {
        setName(formEdited.name)
        setAge(formEdited.age)
    }
  }, [type, formEdited])

  return (
    <>
      <Row>
        <Form onSubmit={handleSubmit}>
          <>
            <FormGroup>
              <Label>Name</Label>
              <Input
                value={name}
                placeholder="Please Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Age</Label>
              <Input
                type="number"
                value={age}
                placeholder="Please Enter Your Name"
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </FormGroup>

            <Row>
                <Col>
                <Button color="success" type="submit">Submit</Button>
                </Col>

                <Col>
                <Button color="success" type="submit" onClick={() => setFormVisible(false)} >Cancel</Button>
                </Col>
                
                {/* &nbsp;&nbsp; */}
                
            </Row>
          </>
        </Form>
      </Row>
    </>
  );
};

export default FormEmployee;
