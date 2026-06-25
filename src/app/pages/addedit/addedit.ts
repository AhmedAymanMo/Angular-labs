import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addedit-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addedit.html',
  styleUrl: './addedit.scss',
})
export class AddEditPage  {}
