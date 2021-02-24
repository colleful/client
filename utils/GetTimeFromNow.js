import {useState, useEffect} from 'react';

const GetTimeFromNow = (updatedAt) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [updatedAtTime] = useState(new Date(updatedAt));

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 60000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const timeAgo = Math.floor(
    (dateTime.getTime() - updatedAtTime.getTime()) / 1000 / 60,
  );

  if (timeAgo / 60 >= 24 * 30 * 12)
    return Math.floor(timeAgo.toString() / 60 / 24 / 30 / 12) + '년전';

  if (timeAgo / 60 >= 24 * 30)
    return Math.floor(timeAgo.toString() / 60 / 24 / 30) + '달전';

  if (timeAgo / 60 >= 24)
    return Math.floor(timeAgo.toString() / 60 / 24) + '일전';

  if (timeAgo / 60 >= 1) return Math.floor(timeAgo.toString() / 60) + '시간전';

  if (timeAgo >= 1) return timeAgo.toString() + '분전';

  return '방금전';
};

export default GetTimeFromNow;
