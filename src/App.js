import React, { useState, useEffect } from 'react';
import './App.css';
import CourseCard from './components/CourseCard';

function App() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制菜单展开/关闭

  useEffect(() => {
    fetch('https://api.authclass.com/user/v1/course')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('加载失败，请检查网络。');
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <img 
              src="https://authclass-static.oss-accelerate.aliyuncs.com/website/logo-app-full.png" 
              alt="App Logo" 
              className="logo-img"
            />
          </div>
          <div className="header-search">
            <input
              type="text"
              className="search-box"
              placeholder="搜索课程名称"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="header-right">
            <div className="desktop-buttons">
              <button>Log In</button>
              <button className="primary">Sign Up</button>
            </div>
            <div className="menu">
              <button className="menu-toggle-btn" onClick={toggleMenu}>
                ☰ 
              </button>
            {isMenuOpen && (
                <div className="menu-content">
                  <button onClick={closeMenu}>X</button>
                  <button>Log In</button>
                  <button className="primary">Sign Up</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        {loading && <p>加载中...</p>}
        {error && <p className="error">{error}</p>}

        <div className="course-list">
          {filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p>没有找到匹配的课程。</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
