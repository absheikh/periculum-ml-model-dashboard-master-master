import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import Layout from "../../components/Layout/layout";
import styled from "styled-components";
import { Container } from "../../styles/container";
import { Link } from "react-router-dom";
import {
  BigTick,
  ButtonChart,
  PaperDownload,
  PaperUpload,
  SmallTick,
  NextPage,
  Prev,
  Next,
  Document,
  DownloadSM,
  Previous,
} from "../../assets/svg";
import backgroundImg from "../../assets/icons/dash-icon.svg";
const Dashboard = () => {
  const [uplaod, setUpload] = React.useState(false);
  const [download, setDownload] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const handleUpload = () => {
    setUpload(!uplaod);
  };
  const handleDownload = () => {
    setDownload(!download);
  };
  const handleUploadSuccess = () => {
    setUploadSuccess(!uploadSuccess);
  };

  const reports = [
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
    {
      name: "9-Feb-22 Report 0001 ",
      number: "200 out of 5000 customers",
    },
  ];

  const totalreports = reports.length || 0;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [reportsPerPage] = React.useState(8);
  // Get reports
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentreports = reports.slice(indexOfFirstReport, indexOfLastReport);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalreports / reportsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {" "}
      {uplaod && (
        <ModalUpload>
          <p className="close" onClick={handleUpload}>
            X
          </p>

          <Dropzone
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onDrop={(acceptedFiles) => {
              console.log(acceptedFiles);
              setUploadSuccess(true);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="modal">
                <h2>Upload .csv file</h2>
                <div
                  className="file-input"
                  onClick={handleUploadSuccess}
                  {...getRootProps()}
                >
                  <PaperDownload />
                  <input
                    {...getInputProps()}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                  <p className="text">Drag &amp; Drop your file here</p>
                  <p className="text2">
                    or <span>Select file here</span>
                  </p>
                </div>
                <a
                  className="footer-text"
                  onClick={handleDownload}
                  href="../files/Sample file.xlsx"
                  download
                >
                  Download sample .csv file here
                </a>
                {download && (
                  <DownloadSuccess>
                    <SmallTick /> <p>Download Successful</p>
                  </DownloadSuccess>
                )}
              </section>
            )}
          </Dropzone>
        </ModalUpload>
      )}
      {uploadSuccess && (
        <ModalUploadSuccess>
          <p className="close" onClick={handleUploadSuccess}>
            X
          </p>

          <section className="modal">
            <BigTick />
            <h2>Upload Successful</h2>
            <Link to="/reports/new">View report</Link>
          </section>
        </ModalUploadSuccess>
      )}
      <Layout>
        <Container>
          <Welcome>
            <Header>Get started with your analytics</Header>
            <Grid>
              <ButtonW to="/reports/all">
                <ButtonChart /> <p>Check churn from database</p>
              </ButtonW>
              <ButtonP onClick={handleUpload}>
                <PaperUpload /> <p>Upload file</p>
              </ButtonP>
            </Grid>
          </Welcome>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Number of customers</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentreports.map((report) => (
                  <tr>
                    <td>{report.name}</td>
                    <td>{report.number}</td>
                    <td>
                      <Buttons>
                        <Button to="/reports/history">
                          <Document /> View report
                        </Button>
                        <LinkDownload href="../files/Sample file.xlsx" download>
                          <DownloadSM />
                          Download as .csv file
                        </LinkDownload>
                      </Buttons>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          {/* //Pagination */}
          <Pagination>
            <Previous
              className={currentPage === 1 ? "icon active" : "icon "}
              onClick={() => paginate(1)}
            />
            <Prev onClick={() => paginate(1)} />
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={number === currentPage ? "active" : ""}
              >
                <a
                  onClick={() => paginate(number)}
                  href="#"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}

            <Next onClick={() => paginate(pageNumbers.length)} />
            <NextPage
              className={
                currentPage == pageNumbers.length ? "icon active" : "icon "
              }
              onClick={() => paginate(pageNumbers.length)}
            />
          </Pagination>
        </Container>
      </Layout>
    </>
  );
};
const ModalUpload = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  & .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;
    cursor: pointer;
    font-family: "Gilroy-SemiBold";
    color: #fff;
    font-size: 24px;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 0 0 0 16px;
  }
  & .modal {
    max-width: 585px;
    width: 90%;
    max-height: 355px;
    height: 100%;
    background-color: #fff;
    padding: 46px 32px;
    position: relative;

    & h2 {
      font-family: "Gilroy-ExtraBold";
      font-size: 24px;
      line-height: 28px;
      color: #363c4f;
      margin-bottom: 16px;
    }
    & .file-input {
      border: 1px dashed ${(props) => props.theme.colors.primary};
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 32px;
    }
    & .text {
      font-family: "Gilroy-SemiBold";
      font-size: 18px;
      line-height: 21px;
      color: #363c4f;
      margin-bottom: 8px;
    }
    & .text2 {
      font-family: "Gilroy-SemiBold";
    }
    & .text2 span {
      font-family: "Gilroy-SemiBold";
      font-size: 16px;
      line-height: 19px;

      color: ${(props) => props.theme.colors.primary};
    }
    & .footer-text {
      text-decoration: none;
      display: block;
      font-family: "Gilroy-Medium";
      font-size: 14px;
      line-height: 16px;
      /* identical to box height */

      text-align: center;
      text-decoration-line: underline;

      color: #1f3040;
      margin-bottom: 16px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
const ModalUploadSuccess = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  & .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;
    cursor: pointer;
    font-family: "Gilroy-SemiBold";
    color: #fff;
    font-size: 24px;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 0 0 0 16px;
  }
  & .modal {
    max-width: 585px;
    width: 90%;
    max-height: 355px;
    height: 100%;
    background-color: #fff;
    padding: 46px 32px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h2 {
      font-family: "Gilroy-ExtraBold";
      font-size: 28px;
      line-height: 33px;
      text-align: center;

      color: ${(props) => props.theme.colors.primary};

      margin: 16px 0px;
    }
    & a {
      text-decoration: none;
      background-color: ${(props) => props.theme.colors.primary};
      padding: 16px 32px;
      font-family: "Gilroy-ExtraBold";
      font-size: 12px;
      line-height: 14px;
      text-align: center;
      color: ${(props) => props.theme.colors.white};
      &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.colors.white};
        color: ${(props) => props.theme.colors.primary};
        border: 0.1px solid ${(props) => props.theme.colors.primary};
        transition: 0.3s;
    }
  }
`;
const Welcome = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  margin-top: 64px;
  padding: 64px;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: right;
  background-size: 250px;
  @media screen and (max-width: 1300px) {
    background-image: none;
  }
  @media screen and (max-width: ${(props) => props.theme.screens.tablet}) {
    padding: 32px;
  }
`;
const Header = styled.h1`
  font-family: "Gilroy-Bold";
  font-size: 40px;
  line-height: 47px;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 32px;
  @media screen and (max-width: ${(props) => props.theme.screens.tablet}) {
    font-size: 32px;
    line-height: 40px;
  }
  @media screen and (max-width: ${(props) => props.theme.screens.mobile}) {
    font-size: 24px;
    line-height: 32px;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 32px;
  max-width: 596px;
  @media screen and (max-width: ${(props) => props.theme.screens.tablet}) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;
const ButtonW = styled(Link)`
  text-decoration: none;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;

  & p {
    font-family: "Gilroy-Bold";
    font-family: "Gilroy-SemiBold";
    font-size: 20px;
    line-height: 23px;
    color: ${(props) => props.theme.colors.secondary};
  }
  &:hover {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.white};
    & p {
      color: ${(props) => props.theme.colors.white};
    }
    ,
    & svg path {
      fill: ${(props) => props.theme.colors.white};
    }
  }
`;
const ButtonP = styled.div`
  text-decoration: none;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.white};
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;

  & p {
    font-family: "Gilroy-Bold";
    font-family: "Gilroy-SemiBold";
    font-size: 20px;
    line-height: 23px;
    color: ${(props) => props.theme.colors.white};
  }
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.white};
    & p {
      color: ${(props) => props.theme.colors.secondary};
    }
    ,
    & svg path {
      fill: ${(props) => props.theme.colors.secondary};
    }
  }
`;
const DownloadSuccess = styled.div`
  background-color: #e8fff8;
  padding: 16px 8px;
  display: flex;
  gap: 8px;
  max-width: 178.19px;
  align-items: center;
  border: 0.614458px solid #0cbc8b;
  margin: 0 auto;
  & p {
    font-family: "Gilroy-SemiBold";
    font-size: 12.2892px;
    line-height: 14px;
    /* identical to box height */

    color: #000000;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
const Button = styled(Link)`
  text-decoration: none;
  display: flex;
  gap: 6px;
  font-family: "Gilroy-SemiBold";
  font-size: 16px;
  line-height: 19px;

  color: #083a9a;
  align-items: center;
`;
const LinkDownload = styled.a`
  text-decoration: none;
  display: flex;
  gap: 6px;
  font-family: "Gilroy-SemiBold";
  font-size: 16px;
  line-height: 19px;

  color: #083a9a;
  align-items: center;
`;
const FlexContaineHeader = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 32px;
  & h2 {
    font-family: "Gilroy-SemiBold";
    font-size: 24px;
    line-height: 28px;
    /* identical to box height */

    /* Color/Primary/04 */

    color: #363c4f;
    margin-bottom: 4px;
  }
  & p {
    font-family: "Gilroy-Regular";
    font-size: 18px;
    line-height: 21px;

    /* Color/Primary/04 */

    color: #363c4f;
  }
`;
const TableContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
`;
const Table = styled.table`
  margin-top: 32px;
  border-collapse: separate;
  table-layout: fixed;
  width: 80%;
  border-spacing: 0 8px;

  & tbody tr {
    border: 1px solid #b4d2ff !important;
  }
  width: 100%;
  & thead th {
    text-align: left;
    font-family: "Gilroy-SemiBold";
    font-size: 18px;
    line-height: 21px;
    text-transform: uppercase;
    color: #363c4f;
    padding: 16px 24px;
  }

  & tr td {
    padding: 32px 24px;
    font-family: "Gilroy-SemiBold";
    font-size: 16px;
    line-height: 19px;

    color: #000000;

    gap: 8px;
    border-width: 1px 0;
    width: 50%;
    border-color: #b4d2ff;
    border-style: solid;
  }
  & tr td:first-child {
    border-left-width: 1px;
  }
  & tr td:last-child {
    border-right-width: 1px;
  }
`;
const Pagination = styled.ul`
  margin-top: 64px;
  display: flex;
  gap: 25px;
  list-style: none;
  align-items: center;
  justify-content: center;

  & a {
    text-decoration: none;
    font-family: "Gilroy-Regular";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;

    /* PRIMARY BLUE */

    color: #000;
  }
   "& .active": {
        color: #1162dc !important,
      },
`;
export default Dashboard;
