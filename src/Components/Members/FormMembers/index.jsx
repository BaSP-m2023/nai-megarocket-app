import { useState, useEffect } from 'react';
import styles from './form.module.css';

function MemberForm({ onSubmit, member, onCancel }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [membership, setMembership] = useState('');

  useEffect(() => {
    if (member) {
      setFirstName(member.firstName);
      setLastName(member.lastName);
      setDni(member.dni);
      setPhone(member.phone);
      setEmail(member.email);
      setPassword(member.password);
      setCity(member.city);
      const date = new Date(member.birthDay);
      setBirthDay(date.toISOString().substring(0, 10));
      setPostalCode(member.postalCode);
      setIsActive(member.isActive);
      setMembership(member.membership);
    } else {
      setFirstName('');
      setLastName('');
      setDni('');
      setPhone('');
      setEmail('');
      setPassword('');
      setCity('');
      setBirthDay('');
      setPostalCode('');
      setIsActive(false);
      setMembership('');
    }
  }, [member]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...member,
      firstName,
      lastName,
      dni,
      phone,
      email,
      password,
      city,
      birthDay,
      postalCode,
      isActive,
      membership
    });
  };

  return (
    <div className={styles['form-container']}>
      <form className={styles['form-form']} onSubmit={handleSubmit}>
        <label className={styles['form-label']}>
          Name:
          <input
            className={styles['form-input']}
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label className={styles['form-label']}>
          Last Name:
          <input
            className={styles['form-input']}
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <label className={styles['form-label']}>
          DNI:
          <input
            className={styles['form-input']}
            type="text"
            value={dni}
            onChange={(event) => setDni(event.target.value)}
          />
        </label>
        <label className={styles['form-label']}>
          Phone:
          <input
            className={styles['form-input']}
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
        <label className={styles['form-label']}>
          Email:
          <input
            className={styles['form-input']}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className={styles['form-label']}>
          Password:
          <input
            className={styles['form-input']}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label className={styles['form-label']}>
          City:
          <input
            className={styles['form-input']}
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <label className={styles['form-label']}>
          Date of birth:
          <input
            className={styles['form-input']}
            type="date"
            value={birthDay}
            onChange={(event) => setBirthDay(event.target.value)}
          />
        </label>
        <label className={styles['form-label']}>
          ZIP code:
          <input
            className={styles['form-input']}
            type="text"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
          />
        </label>
        <label className={styles['form-label']}>
          Is Active?
          <input
            className={styles['form-input']}
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
          />
        </label>
        <label className={styles['form-label']}>
          Memberships:
          <select
            className={styles['form-select']}
            value={membership}
            onChange={(event) => setMembership(event.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Black">Black</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>
        </label>
        <div className={styles['button-container']}>
          <button className={styles['form-button']} type="submit">
            submit
          </button>{' '}
          {onCancel && (
            <>
              {' '}
              <button className={styles['form-button']} type="button" onClick={onCancel}>
                Cancel
              </button>{' '}
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default MemberForm;
