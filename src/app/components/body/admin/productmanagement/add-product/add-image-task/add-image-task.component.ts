import {Component, Input, OnInit} from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import { AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {finalize, tap} from "rxjs/operators";

@Component({
  selector: 'app-add-image-task',
  templateUrl: './add-image-task.component.html',
  styleUrls: ['./add-image-task.component.scss']
})
export class AddImageTaskComponent implements OnInit {
  @Input() file: File;
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }


  ngOnInit() {
    this.startUpload(); // Can extract to a button if wanted.
  }

  startUpload() {
    // The storage path
    const path = `productImage/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db.collection('files').add({downloadURL: this.downloadURL, path});
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running'
  }
}
