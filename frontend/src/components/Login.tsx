import React from 'react';

const Login = () => {
  return (
    <div className=" flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[650px] h-[444px] border-2 p-6 bg-white rounded-[20px] shadow-md">
        <div className=" flex mt-[15px] ml-[15px]">
          <button className="btn btn-active text-[20px] w-[118px] h-[62px] mb-[20px] border-none bg-gray-700 text-white">
            개인회원
          </button>
          <button className="btn btn-active text-[20px] w-[118px] h-[62px] ml-[12px] mb-[12px] border-none bg-gray-100 text-black hover:bg-gray-700 hover:text-white ">
            식당회원
          </button>
        </div>
        <div className="flex items-start">
          <div className="flex flex-col w-[400px] ml-[15px] mr-2">
            <input
              type="text"
              placeholder="아이디"
              className="input input-bordered text-[19px] left-[10px] mb-[8px] w-[400px] h-[62px] border-2 bg-gray-100 text-black "
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="input input-bordered text-[19px] left-[10px] w-[400px] h-[62px] border-2 bg-gray-100 text-black"
            />
          </div>
          <button className="btn w-[141px] h-[136px] ml-[8px] bg-gray-700 text-white">로그인</button>
        </div>
        <div className="ml-[15px] flex items-center mt-4 mb-[30px]">
          <input type="checkbox" className="checkbox checkbox-xs" />
          <label className="text-[17px] ml-2 text-gray-600 text-sm">로그인 유지</label>
        </div>

        {/* 밑줄 추가 */}
        <hr className="my-4 border-t border-gray-300" />

        {/* 아이디찾기, 비밀번호찾기, 회원가입 배치 */}
        <div className="text-[17px] flex justify-center space-x-10 text-xs text-gray-600 mt-4">
          <a href="#" className="link">
            아이디찾기
          </a>
          <a href="#" className="link">
            비밀번호찾기
          </a>
          <a href="#" className="link font-bold">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
