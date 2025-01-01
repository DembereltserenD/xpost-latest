<template>
    <div>
        <el-form :model="form" :rules="rules" ref="form" label-position="top">
            <el-form-item label="Logo" prop="logo">
                <el-upload class="upload-demo" action="" :before-upload="beforeUpload" :on-remove="handleRemove"
                    :file-list="fileList" list-type="picture">
                    <el-button slot="trigger" size="small" type="primary">Upload Logo</el-button>
                    <div slot="tip" class="el-upload__tip">Only jpg/png files with a size less than 2MB</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="Site Name" prop="siteName">
                <el-input v-model="form.siteName"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="loading">Save Settings</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                logo: null,
                siteName: '',
            },
            fileList: [],
            loading: false,
            rules: {
                logo: [{ required: true, message: 'Please upload a logo', trigger: 'change' }],
                siteName: [{ required: true, message: 'Please enter site name', trigger: 'blur' }],
            },
        };
    },
    methods: {
        beforeUpload(file) {
            this.form.logo = file;
            this.fileList = [file];
            return false;
        },
        handleRemove() {
            this.form.logo = null;
            this.fileList = [];
        },
        async onSubmit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        this.loading = true;
                        const formData = new FormData();
                        if (this.form.logo) {
                            formData.append('logo', this.form.logo);
                        }
                        formData.append('siteName', this.form.siteName);

                        await this.$axios.post('/api/admin/settings', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        });

                        this.$toast.success('Settings updated successfully');
                    } catch (error) {
                        this.$toast.error('Failed to update settings');
                        console.error(error);
                    } finally {
                        this.loading = false;
                    }
                }
            });
        },
    },
};
</script>

<style scoped>
.upload-demo {
    display: flex;
    align-items: center;
}
</style>