import React from 'react';
import './FounderNote.css';

const FounderNote = () => {
  return (
    <section className="founder-note" aria-labelledby="founder-note-title">
      <div className="container">
        <div className="founder-note-content">
          <p className="founder-note-label">Our Belief</p>

          <h2 id="founder-note-title">Founder’s Note</h2>

          <p className="founder-note-text">
            This platform was created by a backbencher—someone who believes that
            examinations and academic results do not define a person’s ability to
            innovate. True innovation is driven by{" "}
            <strong>curiosity</strong>, <strong>creativity</strong>,{" "}
            <strong>determination</strong>, and the <strong>courage</strong> to solve
            real-world problems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderNote;
