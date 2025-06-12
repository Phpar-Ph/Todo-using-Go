const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-slate-800">
        About Daily Task Manager
      </h1>
      <div className="max-w-2xl text-lg text-slate-700 space-y-4">
        <p>
          Daily Task Manager is a simple yet powerful todo application built
          with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Go (Fiber) for the backend</li>
          <li>React for the frontend</li>
          <li>MongoDB for data storage</li>
          <li>TailwindCSS for styling</li>
        </ul>
        <p>
          This project demonstrates the integration of a modern frontend with a
          Go-powered backend, featuring real-time updates and a clean,
          responsive interface.
        </p>
      </div>
    </div>
  );
};

export default About;
