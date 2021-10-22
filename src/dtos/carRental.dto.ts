export class CreateCarRentalDto {
  customer: string;
  phone: string;
  carPlate: string;
  rentFrom: string;
  rentTo: string;
  userId: string;
}

export class UpdateCarRentalDto{
  customer: string;
  phone: string;
  carPlate: string;
  rentFrom: string;
  rentTo: string;
  userId: string;
  status: string;
}
