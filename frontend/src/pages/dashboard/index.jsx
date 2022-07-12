import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import FormEmployee from './form';
import request from '../../helpers/request';

const Dashboard = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [formType, setFormType] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formEdited, setFormEdited] = useState({});

  const handleAddEmployee = () => {
    setFormType('create');
    setFormVisible(true);
  };
  const handleEdit = (data) => {
    setFormEdited(data);
    setFormType('edit');
    setFormVisible(true);
  };

  const handleDelete = async(id) => {
    await request.delete(`/employee/${id}`)
    .then(() => fetchData())
    .catch(err => console.log(err))
  };

  const fetchData = async () => {
    await request.get('/employee')
    .then(( {data} ) => {
      setEmployeeList(data)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, []);

  // console.table(employeeList);
  return (
    <div className="dashboard-container" style={{ margin: "0px 250px" }}>
      <h1>Employee List</h1>
      <br />
      <Button color="primary" onClick={() => handleAddEmployee()}>
        Add Employee
      </Button>
      <br />
      <Table striped width={200}>
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employeeList.map((row, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>
                <Button color="warning" onClick={() => handleEdit(row)}>
                  Edit
                </Button>
                &nbsp;&nbsp;
                <Button color="danger" onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form */}
      <Modal isOpen={formVisible} toggle={() => setFormVisible(!formVisible)}>
            <ModalHeader>{`Form ${formType} data`}</ModalHeader>
            <ModalBody>
                <FormEmployee
                    type = {formType}
                    setFormVisible = {setFormVisible}
                    formEdited = {formEdited}
                    fetchData = {fetchData}
                />
            </ModalBody>
      </Modal>
    </div>
  );
};

export default Dashboard;
