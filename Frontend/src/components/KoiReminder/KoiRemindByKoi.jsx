// KoiRemindByKoi.jsx
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';

const KoiRemindByKoi = ({ reminds, updateKoiRemind }) => {
    const [latestReminds, setLatestReminds] = React.useState([]);
  // Sort and get 3 latest reminds
  useEffect(() => {
    const latestReminds = reminds
        ?.sort((a, b) => new Date(b.dateRemind) - new Date(a.dateRemind)).slice(0, 3);
    setLatestReminds(latestReminds);
    updateKoiRemind();
    }, []);
  return (
    <>
      {latestReminds && latestReminds.length > 0 ? (
        latestReminds.map((remind, index) => (
          <Card 
            key={index}
            className="mb-3"
            style={{ background: '#f5f5f5', borderRadius: '8px' }}
          >
            <Card.Body>
              <Card.Title className="fw-bold">
                {new Date(remind.dateRemind).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Card.Title>
              <Card.Text className="mb-0 mt-2">
                {remind.remindDescription}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card>
          <Card.Body>No reminds found</Card.Body>
        </Card>
      )}
    </>
  );
};

export default KoiRemindByKoi;