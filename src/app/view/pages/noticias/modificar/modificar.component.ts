import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ref, uploadBytes } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Loading, Notify } from 'notiflix';
import { Storage, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit, AfterViewInit, OnChanges{
  @Input()dato?:any=null
  @Output() cerrarmodificar = new EventEmitter();

  constructor(
    private firestore:Firestore,
    private storage:Storage
  ){}
  array?:any
  fechacreate:string = ''
  update:FormGroup = new FormGroup({
    titulo: new FormControl(''),
    autor: new FormControl(''),
    fecha: new FormControl(''),
    document: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(''),
  })
  imgurl:string='';
  docurl:any = '';
  urlimg:any = '';
  logo:string = "../../../../assets/img/yolotl.webp";
  images='images/*'
  imgerror:string = '';
  lista:any = [
    {url: '/admin/noticias', icon:'bi bi-newspaper me-2', name:'Noticias'},
    {url: '/admin/noticias/crear', icon:'bi bi-patch-plus-fill me-2', name:'Agregar'},
    // {url: 'admin/noticias/modificar', icon:'bi bi-cloud-upload-fill me-2', name:''},/
  ]

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
  }
 ngOnChanges(changes: SimpleChanges): void {
  if (this.dato!= null) {
    this.getdata()
  }
 }

  async getdata(){
    Loading.arrows("Espere un momento ...")
    if (this.dato!==null) {
      const id = this.dato;
      console.log(id);
      const r = doc(this.firestore, 'noticias', id);
      const docSnap = await getDoc(r);
      this.array = docSnap.data();
      const imgRef = ref(this.storage, 'images/' + this.array["img"]);
      const imgUrl = await getDownloadURL(imgRef);
      this.array["img"] = imgUrl
      const docref = ref(this.storage, 'archivos/' + this.array["document"]);
      const docurl = await getDownloadURL(docref);
      this.array["document"] = docurl
      }
      this.update = new FormGroup({
      titulo: new FormControl(this.array.titulo,[Validators.required]),
      autor: new FormControl(this.array.autor,[Validators.required]),
      fecha: new FormControl(this.array.fecha,[Validators.required]),
      description: new FormControl(this.array.description,[Validators.required]),
      document: new FormControl(this.array.docurl ,[Validators.required]),
      img: new FormControl(this.array.imgUrl,[Validators.required]),
      })
      console.log(this.array.imgUrl,this.array.docurl)
      const datecreate = new Date();
      this.fechacreate = datecreate.toLocaleDateString();
      console.log(this.fechacreate)
      Loading.remove();
  }
  cerrar(){
    this.cerrarmodificar.emit()
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
    console.log(this.urlimg)
  }
  getdoc(event:any){
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        const docurl = event.target.result;
      }
      this.docurl = event.target.files[0]
      console.log(this.docurl)
    }
  }

  async updatenotice(){
    this.getdata()

    const imgref = ref(this.storage,`images/${this.urlimg.name}`);
    const docref = ref(this.storage,`archivos/${this.docurl.name}`);
    const reference = doc(this.firestore,'noticias',this.dato)
    const docupdate = {
      titulo:this.update.get('titulo')?.value,
      autor:this.update.get('autor')?.value,
      fecha:this.update.get('fecha')?.value,
      description:this.update.get('description')?.value,
      img:imgref.name,
      document:docref.name,
    }
    try {
      Loading.arrows("enviando..")
      uploadBytes(imgref,this.urlimg,{contentType:'image/*'}).then().catch(error=>console.log(error))
      uploadBytes(docref,this.docurl,{contentType:'application/pdf'}).then().catch(error=>console.log(error))
      updateDoc(reference,docupdate).then(()=>
        {
          Notify.success("Actualizado")
          setTimeout(() => {
            window.location.reload()
          }, 2500);
        }
      )
      Loading.remove();
    } catch (error) {
      Notify.failure("error")
    }
 }
}
