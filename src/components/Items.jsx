import Item from "./Item.jsx";
const items = ({ posts, isUsers }) => {
  if (!posts.length)
    return <h1 className="text-2xl text-center">לא מצאנו חיות</h1>;
  return (
    <div className="p-16">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {posts.map((post) => (
          <Item key={post.id} post={post} isUser={isUsers} />
        ))}
      </ul>
    </div>
  );
};

export default items;
