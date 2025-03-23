export default function ChatBox() {
  return (
    <div className="flex-1 m-4 h-[95vh] bg-base-100 p-6 rounded-2xl shadow-md overflow-hidden">
      <h1 className="text-xl font-bold mb-4">🩺 Chat</h1>
      <div className="h-[77vh] bg-base-200 rounded-2xl p-4 overflow-y-auto">
        {/* Chat messages will go here */}
        <p className="text-base text-gray-600">
          Start a conversation with NURSAI...
        </p>
      </div>
      {/* <div className="flex justify-center mt-4 ">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full bg-primary text-primary-content placeholder-primary-content font-medium rounded-xl shadow-md "
        />
      </div> */}
      <div className="mt-5">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type here"
            className="input w-11/12 bg-primary text-primary-content placeholder-primary-content font-medium rounded-xl pr-3"
          />
          <button className="btn btn-primary absolute right-1 top-1/2 -translate-y-1/2 rounded-xl px-4">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
