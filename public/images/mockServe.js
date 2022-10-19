// 先引入mockjs模块
import Mock from 'mockjs';
// 把son数据引入进来
// webpack默认对外暴露的：图片、json数据 所以不需要对json做对外暴露操作
import banner from './banner.json';
import floor from './floor.json';
// mock数据：第一个参数请求地址 第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });