<template>
  <div class="admin-dest-save">
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/dest' }">目的地管理</el-breadcrumb-item>
      <el-breadcrumb-item>目的地保存</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="admin-dest-save-box">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">目的地</span>
        <el-button style="float: right;" type="primary" @click="saveDest()">保存</el-button>
      </div>
      <el-form ref="destForm" label-position="left" :model="destForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="destForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="destForm.dest"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="destForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input type="textarea" v-model="destForm.info"></el-input>
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
  </div>
</template>

<script>
  import Core from '@/core/core'

  export default {
    data () {
      return {
        uploadAction: Core.Data.getUploadUrl(),
        header: {
          Authorization: 'Basic ' + Core.Data.getToken()
        },
        destForm: {},
        imgList: []
      }
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      },
      getDestDetail (id) {
        Core.Api.DESTINATION.getDestDetail(id).then((data) => {
          this.destForm = data.dest
          for (var i = 0; i < this.destForm.img_list.length; i++) {
            var img = {
              name: this.destForm.img_list[i]
            }
            this.imgList.push(img)
          }
        }, (error) => {
          this.$message.error('数据获取失败：' + error.message)
        })
      },
      saveDest () {
        if (this.destForm.name === undefined || this.destForm.intro === undefined || this.destForm.info === undefined || this.destForm.dest === undefined) {
          this.$message.error('信息不完整')
          return
        }
        // console.log(this.imgList)
        var imgs = ''
        for (var i = 0; i < this.imgList.length; i++) {
          var name = this.imgList[i].response ? this.imgList[i].response.data.file.name : this.imgList[i].name
          if (i === 0) {
            imgs = name
          } else {
            imgs = imgs + ',' + name
          }
        }
        // console.log(imgs)
        Core.Api.DESTINATION.saveDestination(this.destForm.id, this.destForm.name, this.destForm.intro, this.destForm.info, this.destForm.dest, imgs).then(() => {
          this.$message.success('保存成功')
          if (!this.destForm.id) {
            this.destForm = {}
            this.imgList = []
          } else {
            this.$router.push('/admin/dest')
          }
        }, (error) => {
          this.$message.error('保存失败：' + error.message)
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
          window.open('http://' + Core.Const.NET.IMG_URL + file.name, '_blank')
        }
      }
    },
    mounted () {
      var destId = this.$route.params.id
      if (destId) {
        this.getDestDetail(destId)
      }
    }
  }
</script>

<style>
  .admin-dest-save {
    display: block;
    margin: 0;
  }
  .admin-dest-save-box {
    margin: 0 auto;
  }

</style
