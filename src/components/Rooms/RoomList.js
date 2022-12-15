import RoomItem from './RoomItem';
import css from './RoomList.module.scss';

function RoomList({ loadedRooms }) {
  return (
    <div className={css['room-list']}>
      {loadedRooms.map(room => {
        return (
          <RoomItem
            key={room.id}
            id={room.id}
            roomName={room.title}
            roomType={room.type}
            province={room.province}
            images={room.images[0]}
            city={room.city}
            maxPrice={room.max_price}
            minPrice={room.min_price}
            maxLimit={room.max_limit}
            minLimit={room.min_limit}
            isLike={room.isLike}
          />
        );
      })}
    </div>
  );
}
export default RoomList;
