import React from 'react';
import StreamedianPlayer from './StreamedianPlayer';

const index = ({ id, url }) => (
  <div>
    <StreamedianPlayer id={id}>
      <source src={url} type="application/x-rtsp" />
    </StreamedianPlayer>
  </div>
);

export default index;
