<template>
  <div>
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/route' }">路线管理</el-breadcrumb-item>
      <el-breadcrumb-item>路线保存</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="admin-dest-save-box">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">旅游路线</span>
        <el-button style="float: right;" type="primary" @click="saveRoute()">保存</el-button>
      </div>
      <el-form ref="routeForm" label-position="left" :model="routeForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="routeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="routeForm.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <quill-editor ref="routeIntroEditor" v-model="routeForm.intro" :options="editOptions"></quill-editor>
        </el-form-item>
        <el-form-item label="介绍">
          <quill-editor ref="routeInfoEditor" v-model="routeForm.info" :options="editOptions"></quill-editor>
        </el-form-item>
        <el-form-item label="须知">
          <quill-editor ref="routeNoticeEditor" v-model="routeForm.notice" :options="editOptions"></quill-editor>
        </el-form-item>
        <el-form-item label="目的地">
          <el-button type="info" @click="showDestList()">{{routeForm.dest ? routeForm.dest.name : '请选择'}}</el-button>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            ref="upload"
            :headers="header"
            :action="uploadAction"
            :on-preview="handlePreviewImg"
            :on-success="handleUploadImgSuccess"
            :on-remove="handleRemoveImg"
            :file-list="imgList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="选择目的地" v-model="showDestListDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-table :data="destList"
            @row-click="selectDest"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              label="名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="地点"
              prop="dest">
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentDestChange" small layout="total, prev, pager, next" :total="totalDest" :current-page="currentDestPage" style="margin: 10px 0;"></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  import Core from '@/core/core'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    components: {
      'quill-editor': quillEditor
    },
    data () {
      return {
        editOptions: {
        },
        uploadAction: Core.Data.getUploadUrl(),
        header: {
          Authorization: 'Basic ' + Core.Data.getToken()
        },
        totalDest: 0,
        currentDestPage: 1,
        routeForm: {},
        destList: [],
        showDestListDialog: false,
        imgList: []
      }
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      },
      saveRoute () {
        if (this.routeForm.name === undefined || this.routeForm.intro === undefined || this.routeForm.info === undefined) {
          this.$message.error('信息不完整')
          return
        }
        if (this.routeForm.dest === undefined) {
          this.$message.error('请选择目的地')
          return
        }
        if (this.imgList.length === 0) {
          this.$message.error('请选择图片')
          return
        }
        var imgs = ''
        for (var i = 0; i < this.imgList.length; i++) {
          var name = this.imgList[i].response ? this.imgList[i].response.data.file.name : this.imgList[i].name
          if (i === 0) {
            imgs = name
          } else {
            imgs = imgs + ',' + name
          }
        }
        Core.Api.ROUTE.saveRoute(this.routeForm.id, this.routeForm.dest.id, this.routeForm.name, this.routeForm.price, this.routeForm.intro, this.routeForm.info, this.routeForm.notice, imgs).then(() => {
          this.$message.success('保存成功')
          if (!this.routeForm.id) {
            this.routeForm.intro = undefined
            this.routeForm.info = undefined
            this.routeForm.notice = undefined
            this.routeForm.dest = undefined
            this.routeForm = {}
            this.imgList = []
          } else {
            this.$router.push('/admin/route')
          }
        }, (error) => {
          this.$message.error('保存失败：' + error.message)
        })
      },
      getRouteDetail (id) {
        Core.Api.ROUTE.getRouteDetail(id).then((data) => {
          this.routeForm = data.route
          for (var i = 0; i < this.routeForm.img_list.length; i++) {
            var img = {
              name: this.routeForm.img_list[i]
            }
            this.imgList.push(img)
          }
        }, (error) => {
          this.$message.error('数据获取失败：' + error.message)
        })
      },
      handleRemoveImg (file, fileList) {
        // console.log(file, fileList)
        this.imgList = fileList
      },
      handleUploadImgSuccess (response, file, fileList) {
        // console.log(response, file, fileList)
        this.imgList = fileList
      },
      handlePreviewImg (file) {
        if (file.name.startsWith('http')) {
          window.open(file.name, '_blank')
        } else {
          window.open(Core.Const.NET.IMG_URL + file.name, '_blank')
        }
      },
      showDestList () {
        this.showDestListDialog = true
        if (this.destList.length === 0) {
          this.getDestList(1)
        }
      },
      handleCurrentDestChange (page) {
        this.getDestList(page)
      },
      getDestList (page) {
        Core.Api.DESTINATION.getDestList(page - 1).then((data) => {
          this.destList = data.dest_list
          this.currentDestPage = data.number + 1
          this.totalDest = data.totalElements
        }, (error) => {
          this.$message.error('获取列表失败: ' + error.message)
        })
      },
      selectDest (row, event, column) {
        this.routeForm.dest = row
        this.showDestListDialog = false
      }
    },
    mounted () {
      var routeId = this.$route.params.id
      if (routeId) {
        this.getRouteDetail(routeId)
      }
    }
  }
</script>

<style>
</style
