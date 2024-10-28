import { Card, Button, Modal } from 'react-bootstrap'
import AddNewGrowthHistory from '../AddNewGrowthHistory/AddNewGrowthHistory'
import DeleteRecord from '../DeleteRecord/DeleteRecord'
import { useState } from 'react'
import UpdateGrowthHistory from '../UpdateGrowthHistory/UpdateGrowthHistory'
import { BiEdit } from 'react-icons/bi'

const GrowHistory = ({show, setShow, koiData}) => {
  const [growthHistory, setGrowthHistory] = useState(koiData.records || []);
  const [showAddNewGrowthHistory, setShowAddNewGrowthHistory] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);// set for update record

  const lastedUpdatedTime = growthHistory.length > 0 ? growthHistory.sort((a, b) => {
    return new Date(b.updatedTime) - new Date(a.updatedTime)
  })[0] : null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmitAddNewGrowth = (record) => {
    setGrowthHistory((prevHistory)=> [...prevHistory, record])}

  const handleDeleteRecord = (recordId) => {
    setGrowthHistory((prevHistory) => prevHistory.filter((record) => record.recordId !== recordId));
  }
  const handleUpdateRecord = (updatedRecord) => {
    setGrowthHistory((prevHistory) => prevHistory.map((item) => (item.recordId === updatedRecord.recordId ? updatedRecord : item)));
    setSelectedRecord(null);
  };
  const calculateGrowth = (current, previous) => {
    if (!previous) return { lengthGrowth: null, weightGrowth: null };
    const lengthGrowth = (((current.length - previous.length) / previous.length) * 100).toFixed(2);
    const weightGrowth = (((current.weight - previous.weight) / previous.weight) * 100).toFixed(2);
    return {
      lengthGrowth: lengthGrowth > 0 ? `(+${lengthGrowth}%)` : `(no growth)`,
      weightGrowth: weightGrowth > 0 ? `(+${weightGrowth}%)` : `(no growth)`
    };
  };

  const getPreviousRecord = () => {
    if (growthHistory.length > 1) {
      return growthHistory[1]; //previous record of the latest record
    }
    return null;
  };
  
  const previousRecord = getPreviousRecord();
  const { lengthGrowth, weightGrowth } = calculateGrowth(lastedUpdatedTime, previousRecord);

  return (
    <>
    {lastedUpdatedTime ? (
    <Card as={Button} 
    style={{ padding: '10px', borderRadius: '10px', width:'600px', height:'150px', border:'0.5 solid black', transition: 'background-color 0.3s' }} 
    onClick={() => setShow(true)}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF8433'}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
    >
            <p style={{textAlign: 'left', fontSize:'22px'}}>
                <strong>{formatDate(lastedUpdatedTime.updatedTime)} (last measure)</strong>
              </p>
              <hr style={{width:'400px', border:'solid 2px black', margin: '5px auto'  }}/>
            <p style={{textAlign: 'left', fontSize:'20px'}}>
              <strong>Length: </strong> {lastedUpdatedTime.length} cm {lengthGrowth}
              <br />
              <strong>Weight:</strong> {lastedUpdatedTime.weight} g {weightGrowth}
            </p>
          </Card>
          ): (
            <Card as={Button} 
            style={{ padding: '10px', borderRadius: '10px', width:'600px', height:'150px', border:'0.5 solid black', transition: 'background-color 0.3s' }} 
            onClick={() => setShow(true)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF8433'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
            >
            <p>No growth history data</p>
            </Card>
          )}
          <Modal show={show} onHide={() => setShow(false)} size='lg' backdrop="static" style={{backgroundColor:'rgba(0, 0, 0, 0.9)'}}>
            <Modal.Header closeButton>
              <Modal.Title>Growth history</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
              <AddNewGrowthHistory
                show={showAddNewGrowthHistory}
                setShow={setShowAddNewGrowthHistory}
                koiData={lastedUpdatedTime || koiData}
                updateAddedGrowth={handleSubmitAddNewGrowth}
              />

              {growthHistory.length ? growthHistory.map((record) => (
                <Card
                key={record.recordId} style={{ padding: '10px', borderRadius: '10px', border:'0.5 solid black'}}>
                <Card.Header style={{display:"flex"}}>
                  <p>{formatDate(record.updatedTime)}</p>
                </Card.Header>
                <Card.Body style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <p>
                    Length: {record.length} cm
                    <br />
                    Weight: {record.weight} g 
                  </p>
                </Card.Body>
                  <div >
                  <button onClick={() => setSelectedRecord(record)} 
                  style={{ fontWeight: 'bold', fontSize: '18px', 
                  borderRadius: '5px', backgroundColor: '#FF8433', transition: 'background-color 0.3s ease'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#FF6204'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FF8433'}
                  >
                  <BiEdit size={30} color='white'/>
                  </button>
                  <DeleteRecord
                  recordData={record.recordId} 
                  updateDeleteRecord={handleDeleteRecord}/>
                  </div>
                {selectedRecord && selectedRecord.recordId === record.recordId && (
                  <UpdateGrowthHistory
                  show={!!selectedRecord}
                  setShow={() => setSelectedRecord(null)}
                  growthRecord={selectedRecord}
                  updateGrowthRecord={handleUpdateRecord}
                  />)}
              </Card>
              )) : <p>No growth history data</p>}
              </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
            </Modal.Footer>
            </Modal>
    </>
  )
}

export default GrowHistory