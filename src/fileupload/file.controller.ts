import { 
    Controller, 
    Post,
    UploadedFile, 
    UseInterceptors, 
    ParseFilePipe, 
    MaxFileSizeValidator, 
    FileTypeValidator,
    Get,
    Param,
    Delete} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express/multer";


@Controller('aws')
export class FileController {

    constructor(
        private readonly fileService: FileService,  
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async UploadedFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
                // new MaxFileSizeValidator({ maxSize: 1000 }),
                // new FileTypeValidator({ fileType: 'image/jpeg' }),
            ],
        })
    ) 
    file: Express.Multer.File
    ) {
        await this.fileService.upload(file.originalname, file.buffer);
    }

    @Get(':fileName')
    async getFile(@Param('fileName') fileName: string){
        return this.fileService.getFile(fileName);
    }
    
    @Get('download/:fileName')
    async downloadFile(@Param('fileName') fileName: string){
        return this.fileService.downloadFile(fileName);
    }

    @Delete('delete/:fileName')
    async deleteFile(@Param('fileName') fileName: string){
        return this.fileService.deleteFile(fileName);
    }
}