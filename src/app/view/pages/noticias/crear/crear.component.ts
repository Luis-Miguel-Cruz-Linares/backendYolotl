import { Component, OnInit } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { uploadBytes, Storage, ref, listAll   } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { NoticiaService } from 'src/app/services/noticia/noticia.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit{
  logo:string = "../../../../assets/img/yolotl.webp";
  urlimg:any = '';
  imgurl:string='';
  docurl:any = ''
  fecharegistro = ''
  fechacreate:string = ''
  message:boolean = false;
  lista:any = [
    {url: '/admin/noticias', icon:'bi bi-newspaper me-2', name:'Noticias'},
    {url: '/admin/noticias/crear', icon:'bi bi-patch-plus-fill me-2', name:'Agregar'},
    // {url: 'admin/noticias/modificar', icon:'bi bi-cloud-upload-fill me-2', name:''},/
  ]
  Add:FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    description:new FormControl('',[Validators.required]),
  })
  constructor(
    private noticiasrv:NoticiaService,
    private storage:Storage,
    private firestore:Firestore,
  ){}
  ngOnInit(): void {
    const datecreate = new Date();
    this.fechacreate = datecreate.toLocaleDateString();
  }



  getImageData(event:any){
    if (event.target.files) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
      this.imgurl = event.target.result;
    }
    }
    this.urlimg = event.target.files[0]
  }
  getdoc(event:any){
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        const docurl = event.target.result;
      }
      this.docurl = event.target.files[0]
    }
  }


  async add(){
    try {
    const imgref = ref(this.storage,`images/${this.urlimg.name}`);
    const docref = ref(this.storage,`archivos/${this.docurl.name}`);
    const addnoticia = {
    titulo:this.Add.get('titulo')?.value,
    autor:this.Add.get('autor')?.value,
    fecha:this.Add.get('fecha')?.value,
    img:imgref.name,
    document:docref.name,
    description:this.Add.get('description')?.value,
    }
    uploadBytes(imgref,this.urlimg,{contentType:'image/*'}).then().catch(error=>console.log(error))
    uploadBytes(docref,this.docurl,{contentType:'application/pdf'}).then().catch(error=>console.log(error))
    const add = await this.noticiasrv.addnoticia(addnoticia).then(()=>{


    }).then(()=>{
      Notify.success("Agregado correctamente");
      setTimeout(() => {
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })
      }, 700);
      this.Add.get('titulo')?.setValue(''),
      this.Add.get('autor')?.setValue(''),
      this.Add.get('fecha')?.setValue(''),
      this.Add.get('img')?.setValue(''),
      this.Add.get('document')?.setValue(''),
      this.Add.get('description')?.setValue(''),
      this.imgurl = '',
      this.message = true
    })
    } catch (error) {
      Notify.failure("Ha ocurrido algo inesperado");
      setTimeout(() => {
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })
      }, 700);
      this.Add.get('titulo')?.setValue(''),
      this.Add.get('autor')?.setValue(''),
      this.Add.get('fecha')?.setValue(''),
      this.Add.get('img')?.setValue(''),
      this.Add.get('document')?.setValue(''),
      this.Add.get('description')?.setValue(''),
      this.imgurl = ''
    }
  }
  enviarimg(event:any){
    event = event.target.files[0]
    const refimg = ref(this.storage,`images/nueva`)
    uploadBytes(refimg,event)
  }
}
