<template>
    <div class="creative-content min-h-300px max-h-497px pr-16px overflow-auto">
        <div class="creative-material position-relative max-w-916px">
            <div class="creative-group">
                <div class="creative-group-header flex">
                    <span class="creative-group-name">
                        创意组01 <i class="el-icon-edit-outline"></i>
                    </span><i class="el-icon-caret el-icon-caret-bottom"></i>
                </div>
                <div class="creative-group-body">
                    <div class="button-wrap btn-batch-add">
                        <el-button>
                            <el-icon>
                                <Plus />
                            </el-icon>添加素材
                        </el-button>
                    </div>
                    <el-tabs class="mt-16px" type="card">
                        <el-tab-pane label="视频(0/10)" class="p-16px min-h-256px">
                            <div class="upload-container upload-video" id="pane-video">
                                <div class="upload-block upload-flex upload-add">
                                    <div class="upload-flex">
                                        <el-icon class="el-icon-plus" size="32" color="#d4d5d7">
                                            <Plus />
                                        </el-icon>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="图片(0/10)" class="p-16px min-h-256px">
                            <h1>图片</h1>
                        </el-tab-pane>
                        <el-tab-pane label="图文(0/5)" class="p-16px min-h-256px">
                            <h1>图文</h1>
                        </el-tab-pane>
                    </el-tabs>
                    <!-- <div class="creative-tabs el-tabs el-tabs--card el-tabs--top">
                        <div class="el-tabs__header is-top">
                            <div class="el-tabs__nav-wrap is-top">
                                <div class="el-tabs__nav-scroll">
                                    <div role="tablist" class="el-tabs__nav is-top" style="transform: translateX(0px);">
                                        <div id="tab-video" aria-controls="pane-video" role="tab" tabindex="0"
                                            class="el-tabs__item is-top is-active" aria-selected="true"></div>
                                        <div id="tab-image" aria-controls="pane-image" role="tab" tabindex="-1"
                                            class="el-tabs__item is-top"></div>
                                        <div id="tab-carouselMaterial" aria-controls="pane-carouselMaterial" role="tab"
                                            tabindex="-1" class="el-tabs__item is-top"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="el-tabs__content">
                            <div role="tabpanel" id="pane-video" aria-labelledby="tab-video" class="el-tab-pane"
                                style="">
                                <div class="upload-container upload-video">
                                    <div class="upload-block upload-flex upload-add">
                                        <div class="upload-flex"><i class="el-icon-plus"></i></div>
                                    </div>
                                </div>
                                <div class="error-text"></div>
                            </div>
                            <div role="tabpanel" id="pane-image" aria-labelledby="tab-image" class="el-tab-pane"
                                style="display: none;" aria-hidden="true">
                                <div class="upload-container upload-image">
                                    <div class="upload-wrapper upload-flex upload-add"><i class="el-icon-plus"></i>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" id="pane-carouselMaterial" aria-labelledby="tab-carouselMaterial"
                                class="el-tab-pane" style="display: none;" aria-hidden="true">
                                <div class="upload-container upload-image">
                                    <div class="upload-wrapper upload-flex upload-add"><i class="el-icon-plus"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="operate-group">
                <div title="复制创意组" class="mg-icon-copy-wrap"><i class="el-icon-document-copy"></i></div>
                <div title="删除创意组" class="mg-icon-delete-wrap"><i class="mg-icon-mobgi_ic_app_unchecked"></i></div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.el-tabs :deep(.is-top) {
    padding-left: 8px;
}

.creative-material {
    position: relative;
    max-width: 916px;
}

.creative-material:not(:last-child) {
    margin-bottom: 16px
}

.creative-material .creative-group {
    position: relative;
    /* line-height:32px; */
    border: 1px solid #d0d0d0;
    border-radius: 3px
}

.creative-material .creative-group--error {
    border-color: red
}

.creative-material .creative-group:not(:last-child) {
    margin-bottom: 8px
}

.creative-material .creative-group-body {
    position: relative;
    border-top: 1px solid #dcdee2
}

.creative-material .creative-group-header {
    padding: 8px 16px;
    background-color: #fafafa
}

.creative-material .creative-group-name {
    color: #666
}

.creative-material .creative-group .btn-batch-add {
    position: absolute;
    top: 12px;
    right: 16px;
    z-index: 1;
    width: 120px
}

.upload-container {
    display: flex;
    flex-wrap: wrap
}

.upload-container .btn-delete {
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 16px;
    color: #2e71ea;
    cursor: pointer;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0
}

.upload-action-wrapper {
    line-height: 17px
}

.upload-action-wrapper .btn-action {
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    color: #515a6e;
    cursor: pointer
}

.upload-action-wrapper .divider {
    margin-right: 12px;
    margin-left: 12px;
    color: #bfc4d0
}

.upload-block {
    position: relative;
    padding: 8px;
    border: 1px solid #dcdee2
}

.upload-wrapper {
    position: relative;
    box-sizing: border-box;
    width: 200px;
    border: 1px solid #dcdee2
}

.upload-wrapper .img-wrapper {
    position: relative;
    width: 100%;
    height: 110px;
    text-align: center;
    background-color: #fafafa
}

.upload-wrapper .img-wrapper:hover .img-mask {
    opacity: 1
}

.upload-wrapper .img-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-right: 20px;
    padding-left: 20px;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
    transition: opacity .3s
}

.upload-wrapper .img-mask .btn-action {
    width: 120px;
    padding: 0;
    line-height: 22px;
    color: #fff
}

.upload-wrapper img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle
}

.upload-add {
    cursor: pointer;
    border-style: dashed
}

.upload-add .el-icon-plus {
    font-size: 32px;
    font-weight: 500;
    color: #d4d5d7
}

.upload-image .upload-wrapper {
    min-height: 140px;
    margin-right: 23px;
    margin-bottom: 16px
}

.upload-image .upload-wrapper:hover {
    border-color: #2e71ea
}

.upload-image .upload-wrapper:hover .el-icon-plus {
    color: #2e71ea
}

.upload-image .upload-wrapper:hover .btn-delete {
    opacity: 1
}

.upload-image .upload-wrapper:nth-child(4n) {
    margin-right: 0
}

.upload-image .upload-wrapper:nth-last-child(-n+4) {
    margin-bottom: 0
}

.upload-image .material-name {
    margin: 4px 8px 8px
}

.upload-video .upload-add {
    height: 150px
}

.upload-video .upload-block {
    box-sizing: border-box;
    width: 424px;
    margin-right: 20px;
    margin-bottom: 16px
}

.upload-video .upload-block:hover {
    border-color: #2e71ea
}

.upload-video .upload-block:hover .el-icon-plus {
    color: #2e71ea
}

.upload-video .upload-block:hover .btn-delete {
    opacity: 1
}

.upload-video .upload-block:nth-child(2n) {
    margin-right: 0
}

.upload-blank,
.upload-flex {
    display: flex;
    align-items: center;
    justify-content: center
}

.upload-blank {
    flex-direction: column;
    height: 110px
}

.material-name {
    margin-top: 4px;
    font-size: 12px;
    line-height: normal;
    color: #999
}

.el-icon-caret-bottom,
.el-icon-caret-top {
    font-size: 16px;
    color: #999;
    cursor: pointer
}
</style>
